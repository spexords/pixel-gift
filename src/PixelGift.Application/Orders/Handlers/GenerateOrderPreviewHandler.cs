using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Categories.Dtos;
using PixelGift.Application.Orders.Commands;
using PixelGift.Application.Orders.Dtos;
using PixelGift.Application.PromoCodes.Dtos;
using PixelGift.Core.Dtos;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;
using System.Net;
using System.Threading;

namespace PixelGift.Application.Orders.Handlers;

public class GenerateOrderPreviewHandler : IRequestHandler<GenerateOrderPreviewCommand, OrderPreviewDto>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GenerateOrderPreviewCommand> _logger;
    private readonly IOrderService _orderService;

    public GenerateOrderPreviewHandler(PixelGiftContext context, ILogger<GenerateOrderPreviewCommand> logger, IOrderService orderService)
    {
        _context = context;
        _logger = logger;
        _orderService = orderService;
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

        ValidateBasketItems(items, request.BasketItems);

        var orderCategories = GetOrderCategories(items, request.BasketItems, request.Language);

        var summary = await _orderService.GetOrderSummary(items, request.BasketItems, request.PromoCodes, cancellationToken);

        return new OrderPreviewDto(orderCategories, summary);
    }

    private void ValidateBasketItems(IEnumerable<Item> items, Dictionary<Guid, int> basketItems)
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
