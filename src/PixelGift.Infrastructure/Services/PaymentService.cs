using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Dtos;
using PixelGift.Core.Entities;
using PixelGift.Core.Interfaces;
using Stripe;

namespace PixelGift.Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly IOrderService _orderService;
    private readonly IConfiguration _config;
    private readonly ILogger<PaymentService> _logger;

    public PaymentService(IOrderService orderService, IConfiguration config, ILogger<PaymentService> logger)
    {
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
}