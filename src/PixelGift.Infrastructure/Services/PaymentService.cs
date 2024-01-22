using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Dtos;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;
using Stripe;

namespace PixelGift.Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly PixelGiftContext _context;
    private readonly IOrderService _orderService;
    private readonly IConfiguration _config;
    private readonly ILogger<PaymentService> _logger;

    public PaymentService(PixelGiftContext context, IOrderService orderService, IConfiguration config, ILogger<PaymentService> logger)
    {
        _context = context;
        _orderService = orderService;
        _config = config;
        _logger = logger;
    }

    public async Task<OrderPaymentIntent> CreateOrderPaymentIntent(
        IEnumerable<Item> items, 
        Dictionary<Guid, int> basketItems, 
        Dictionary<Guid, string> promoCodes, 
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating Order Payment Intent");

        var summary = await _orderService.GetOrderSummary(items, basketItems, promoCodes, cancellationToken);

        StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

        var paymentIntentService = new PaymentIntentService();
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(summary.Total*100),
            Currency = "pln",
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true,
            },
        };

        var intent = await paymentIntentService.CreateAsync(options, cancellationToken: cancellationToken);

        return new OrderPaymentIntent(summary, intent.Id, intent.ClientSecret);
    }

    public async Task UpdateOrderPaymentSucceeded(string paymentIntentId, CancellationToken cancellationToken)
    {
        var order = await _context.Orders
            .Include(o => o.OrderCategories)
            .ThenInclude(o => o.OrderItems)
            .SingleOrDefaultAsync(o => o.PaymentIntentId == paymentIntentId, cancellationToken);
        
        if(order is null)
        {
            _logger.LogError("Could not find order with payment intent id: {id}", paymentIntentId);
            return;
        }

        foreach(var orderItem in order.OrderCategories.SelectMany(o => o.OrderItems))
        {
            var item = await _context.Items.SingleOrDefaultAsync(i => i.Id == orderItem.ItemId);

            if(item is null)
            {
                continue;
            }

            _logger.LogInformation("Decreasing item ({id}) by quantity: {q}", orderItem.ItemId, orderItem.Quantity);

            item.Quantity -= orderItem.Quantity;
        }

        order.Status = OrderStatus.PaymentReceived;

        await _context.SaveChangesAsync();
    }

    public async Task UpdateOrderPaymentFailed(string paymentIntentId, CancellationToken cancellationToken)
    {
        var order = await _context.Orders.SingleOrDefaultAsync(o => o.PaymentIntentId == paymentIntentId, cancellationToken);

        if (order is null)
        {
            _logger.LogError("Could not find order with payment intent id: {id}", paymentIntentId);
            return;
        }

        order.Status = OrderStatus.PaymentFailed;

        await _context.SaveChangesAsync();
    }
}