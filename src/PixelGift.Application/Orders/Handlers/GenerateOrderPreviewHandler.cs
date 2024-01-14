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
using System.Linq;
using System.Net;

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

        var orderCategoriesDtos = items
            .GroupBy(i => i.CategoryId)
            .Select(g => new OrderCategoryDto(
                g.Key,
                g.First().Category.Name,
                g.Select(gi => GetOrderItem(request, gi)),
                g.First().Category.FormFields.Select(gf => GetOrderFormField(gf))));


        var summary = await GetOrderSummary(orderCategoriesDtos, request.PromoCodes, cancellationToken);

        return new OrderPreviewDto(orderCategoriesDtos, summary);
    }

    private async Task<OrderSummary> GetOrderSummary(IEnumerable<OrderCategoryDto> orderCategoriesDtos, IEnumerable<PromoCodeRequestDto> promoCodes, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Calculating order summary");
        _logger.LogInformation("Fetching valid PromoCodes from database");
        var validPromoCodes = await _context.PromoCodes
            .AsNoTracking()
            .Where(p => promoCodes.Select(pc => pc.Code).Contains(p.Code) && 
                        promoCodes.Select(pc => pc.CategoryId).Contains(p.CategoryId) &&
                        p.Expiry < DateTime.Now)
            .ToListAsync(cancellationToken);


        var subtotal = 0m;
        var discount = 0m;
        var total = 0m;

        foreach(var orderCategory in orderCategoriesDtos)
        {
            _logger.LogInformation("Calculating subtotal and discount for {category}", orderCategory.Name);

            var validPromoCode = validPromoCodes.FirstOrDefault(p => p.CategoryId == orderCategory.Id);

            var categorySubtotal = orderCategory.Items.Sum(i => i.Total);

            if(validPromoCode is not null)
            {
                _logger.LogInformation("Found valid PromoCode");
                discount += Math.Round(categorySubtotal * validPromoCode.Discount);
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

    private FormFieldDto GetOrderFormField(FormField formField) =>
         new FormFieldDto(formField.Id, formField.Name, formField.Type.ToString(), formField.Options?.Split(',').Select(opt => opt.Trim()) ?? Array.Empty<string>());

    private OrderItemDto GetOrderItem(GenerateOrderPreviewCommand request, Item item) =>
        new OrderItemDto(item.Id, item.Name, request.BasketItems[item.Id], item.UnitPrice, request.BasketItems[item.Id] * item.UnitPrice, item.Base64Image);

}
