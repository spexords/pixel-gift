using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Categories.Dtos;
using PixelGift.Application.Orders.Commands;
using PixelGift.Application.Orders.Dtos;
using PixelGift.Application.PromoCodes.Dtos;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;
using System.Threading;

namespace PixelGift.Application.Orders.Handlers;

public class GenerateOrderPreviewHandler : IRequestHandler<GenerateOrderPreviewCommand, OrderPreviewDto>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GenerateOrderPreviewCommand> _logger;

    public GenerateOrderPreviewHandler(PixelGiftContext context, ILogger<GenerateOrderPreviewCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<OrderPreviewDto> Handle(GenerateOrderPreviewCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating order preview for item ids: {ids}", string.Join(',', request.BasketItems.Keys));

        var basketItemIds = request.BasketItems.Keys.Select(k => k);

        var items = await _context.Items
          .AsNoTracking()
          .Include(i => i.Category)
          .ThenInclude(c => c.FormFields)
          .Where(i => basketItemIds.Contains(i.Id))
          .ToListAsync(cancellationToken);

        ValidateBasketItemsRequest(request.BasketItems, items);

        var orderCategories = GetOrderCategories(items, request.BasketItems, request.Language);

        var summary = await GetOrderSummary(items, request.BasketItems, request.PromoCodes, cancellationToken);

        return new OrderPreviewDto(orderCategories, summary);
    }

    private async Task<OrderSummary> GetOrderSummary(
        IEnumerable<Item> items, 
        Dictionary<Guid, int> basketItems, 
        Dictionary<Guid, string> promoCodes, 
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Calculating order summary");

        var validPromoCodes = await GetValidPromoCodes(promoCodes, cancellationToken);
        var subtotal = 0m;
        var discount = 0m;
        var total = 0m;

        foreach (var grouppedItems in items.GroupBy(i => i.CategoryId))
        {
            var categoryId = grouppedItems.Key;

            _logger.LogInformation("Calculating subtotal and discount for CategoryId: {category}", categoryId);

            var validPromoCode = validPromoCodes.FirstOrDefault(p => p.CategoryId == categoryId);

            var categorySubtotal = grouppedItems.Sum(i => basketItems[i.Id] * i.UnitPrice);

            if (validPromoCode is not null)
            {
                _logger.LogInformation("Found valid PromoCode");
                discount += Math.Round(categorySubtotal * validPromoCode.Discount, 2);
            }

            subtotal += categorySubtotal;
        }

        total = subtotal - discount;

        return new OrderSummary(subtotal, discount, total);
    }


    private void ValidateBasketItemsRequest(Dictionary<Guid, int> basketItems, IEnumerable<Item> items)
    {
        var itemsDictionary = items.ToDictionary(i => i.Id);

        foreach ((var itemId, var itemQuantity) in basketItems)
        {
            Item? item;

            itemsDictionary.TryGetValue(itemId, out item);

            if (item is null)
            {
                throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Could not find {nameof(Item)} with id: {itemId}." });
            }

            if (itemQuantity < 0)
            {
                throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Invalid requested item's quantity ({itemQuantity}) item id: {itemId}." });
            }
        }
    }

    private async Task<IEnumerable<PromoCode>> GetValidPromoCodes(Dictionary<Guid, string> promoCodes, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Fetching valid PromoCodes from database");
        var validPromoCodes = await _context.PromoCodes
            .AsNoTracking()
            .Where(p => DateTime.Now < p.Expiry)
            .ToListAsync(cancellationToken);

        var validRequestedPromoCodes = new List<PromoCode>();

        foreach ((var categoryId, var code) in promoCodes)
        {
            var validPromoCode = validPromoCodes.FirstOrDefault(p => p.CategoryId == categoryId && p.Code == code);
            if (validPromoCode is not null)
            {
                validRequestedPromoCodes.Add(validPromoCode);
            }
        }

        return validRequestedPromoCodes;
    }

    private IEnumerable<OrderCategoryDto> GetOrderCategories(IEnumerable<Item> items, Dictionary<Guid, int> basketItems, string language) =>
        items
        .GroupBy(i => i.CategoryId)
        .Select(g => new OrderCategoryDto(
            g.Key,
            g.First().Category.Name,
            g.Select(gi => GetOrderItem(basketItems, gi, language)),
            g.First().Category.FormFields.Select(gf => GetOrderFormField(gf))));

    private FormFieldDto GetOrderFormField(FormField formField) =>
        new FormFieldDto(formField.Id, formField.Name, formField.Type.ToString(), formField.Options?.Split(',').Select(opt => opt.Trim()) ?? Array.Empty<string>());

    private OrderItemDto GetOrderItem(Dictionary<Guid, int> BasketItems, Item item, string language) =>
        new OrderItemDto
        (
            item.Id, 
            language == "en" ? item.Name : item.PolishName, 
            BasketItems[item.Id], 
            item.UnitPrice,
            BasketItems[item.Id] * item.UnitPrice, 
            item.Base64Image);

}
