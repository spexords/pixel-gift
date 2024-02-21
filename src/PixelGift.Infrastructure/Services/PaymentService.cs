using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Dtos;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;
using Stripe;
using System.Text;

namespace PixelGift.Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly PixelGiftContext _context;
    private readonly IOrderService _orderService;
    private readonly IMailService _mailService;
    private readonly IConfiguration _config;
    private readonly ILogger<PaymentService> _logger;

    public PaymentService(PixelGiftContext context, IOrderService orderService, IMailService mailService, IConfiguration config, ILogger<PaymentService> logger)
    {
        _context = context;
        _orderService = orderService;
        _mailService = mailService;
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
            Amount = (long)(summary.Total * 100),
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