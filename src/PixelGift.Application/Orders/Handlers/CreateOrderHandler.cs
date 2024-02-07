using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Orders.Commands;
using PixelGift.Application.Orders.Dtos;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Exceptions;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;
using System.Net;
using System.Text.Json;

namespace PixelGift.Application.Orders.Handlers;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, OrderCreated>
{
    private readonly PixelGiftContext _context;
    private readonly IOrderService _orderService;
    private readonly ILogger<CreateOrderHandler> _logger;

    public CreateOrderHandler(PixelGiftContext context, IOrderService orderService, ILogger<CreateOrderHandler> logger)
    {
        _context = context;
        _orderService = orderService;
        _logger = logger;
    }

    public async Task<OrderCreated> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating order for payment intent id: {id}", request.PaymentIntentId);

        await ValidatePaymentIntentId(request.PaymentIntentId, cancellationToken);

        var basketItemIds = request.BasketItems.Keys.Select(k => k);

        var items = await _context.Items
            .AsNoTracking()
            .Include(i => i.Category)
            .ThenInclude(c => c.FormFields)
            .Where(i => basketItemIds.Contains(i.Id))
            .ToListAsync(cancellationToken);

        ValidateBasketItems(items, request.BasketItems);

        ValidateFormFieldsData(items.Select(i => i.Category).DistinctBy(c => c.Id).SelectMany(c => c.FormFields), request.CategoryFormFieldsData);

        var validPromoCodes = await _orderService.GetValidPromoCodes(request.PromoCodes, cancellationToken);

        var customerOrderId = GetNextCustomerOrderId();
        var order = CreateOrder(request, items, validPromoCodes, customerOrderId);

        _logger.LogInformation("Add order to database");
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        return new OrderCreated(customerOrderId);
    }

    private int GetNextCustomerOrderId()
    {
        try
        {
            return _context.Orders.Max(i => i.CustomerOrderId) + 1;
        }
        catch
        {
            return 1;
        }
    }

    private Order CreateOrder(CreateOrderCommand request, IEnumerable<Item> items, IEnumerable<PromoCode> validPromoCodes, int customerOrderId) =>
        new()
        {
            Email = request.Email,
            CreatedAt = DateTime.Now,
            PaymentIntentId = request.PaymentIntentId,
            Status = Core.Entities.OrderAggregate.OrderStatus.New,
            CustomerOrderId = customerOrderId,
            OrderCategories = items.GroupBy(i => i.CategoryId).Select(g => CreateOrderCategory(g, validPromoCodes, request)).ToList(),
        };

    private OrderCategory CreateOrderCategory(IGrouping<Guid, Item> grouppedItems, IEnumerable<PromoCode> validPromoCodes, CreateOrderCommand request)
    {
        string? promoCode = null;
        PromoCode? validPromoCode = null;

        if (request.PromoCodes.TryGetValue(grouppedItems.Key, out promoCode))
        {
            validPromoCode = validPromoCodes.FirstOrDefault(c => c.CategoryId == grouppedItems.Key && c.Code == promoCode);
        }

        var orderCategory = new OrderCategory
        {
            OrderItems = grouppedItems.Select(i => new OrderItem
            {
                ItemId = i.Id,
                ItemName = i.Name,
                Quantity = request.BasketItems[i.Id],
                UnitPrice = i.UnitPrice
            }).ToList(),
            PromoCode = validPromoCode?.Code,
            CategoryId = grouppedItems.Key,
            CategoryName = grouppedItems.First().Category.Name,
            Metadata = JsonSerializer.Serialize(request.CategoryFormFieldsData[grouppedItems.Key]),
        };

        orderCategory.Subtotal = orderCategory.OrderItems.Sum(i => i.Quantity * i.UnitPrice);
        if (validPromoCode is not null)
        {
            orderCategory.Discount = Math.Round(validPromoCode.Discount * orderCategory.Subtotal, 2);
        }
        orderCategory.Total = orderCategory.Subtotal - orderCategory.Discount;

        return orderCategory;
    }

    private async Task ValidatePaymentIntentId(string paymentIntentId, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(paymentIntentId))
        {
            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Missing payment intent id" });
        }

        if (await _context.Orders.AnyAsync(o => o.PaymentIntentId == paymentIntentId, cancellationToken))
        {
            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Order payment intent id already exists" });
        }
    }

    private void ValidateFormFieldsData(IEnumerable<FormField> formFields, Dictionary<Guid, IEnumerable<FormFieldDataDto>> categoryFormFieldsData)
    {
        _logger.LogInformation("Validating form fields data");

        var requestFormFieldsCount = categoryFormFieldsData.Sum(x => x.Value.Count());
        if (formFields.Count() != requestFormFieldsCount)
        {
            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Invalid form fields data count" });
        }

        foreach ((var categoryId, var formFieldsData) in categoryFormFieldsData)
        {
            foreach (var formField in formFieldsData)
            {
                if (string.IsNullOrEmpty(formField.Value))
                {
                    throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Missing form field value for: '{formField.Key}'" });
                }

                var validFormField = formFields.SingleOrDefault(f => f.Name == formField.Key && f.CategoryId == categoryId);

                if (validFormField is null)
                {
                    throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Could not find {nameof(FormField)} ({formField.Key}) that belongs to category id: {categoryId}" });
                }
            }
        }
    }

    private void ValidateBasketItems(IEnumerable<Item> items, Dictionary<Guid, int> basketItems)
    {
        _logger.LogInformation("Validating requested basket items");
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

            if (itemQuantity > item.Quantity)
            {
                throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Could not create order there is no enough item id: {itemId} in stock ({itemQuantity})." });
            }
        }
    }
}
