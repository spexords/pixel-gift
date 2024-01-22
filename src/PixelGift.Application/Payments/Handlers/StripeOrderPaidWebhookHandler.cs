using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Payments.Commands;
using PixelGift.Core.Interfaces;
using Stripe;

namespace PixelGift.Application.Payments.Handlers;

public class StripeOrderPaidWebhookHandler : IRequestHandler<StripeOrderPaidWebhookCommand, Unit>
{
    private readonly ILogger<StripeOrderPaidWebhookHandler> _logger;
    private readonly IConfiguration _config;
    private readonly IPaymentService _paymentService;

    public StripeOrderPaidWebhookHandler(ILogger<StripeOrderPaidWebhookHandler> logger, IConfiguration config, IPaymentService paymentService)
    {
        _logger = logger;
        _config = config;
        _paymentService = paymentService;
    }

    public async Task<Unit> Handle(StripeOrderPaidWebhookCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Processing Stripe payment webhook");

        var stripeEvent = EventUtility.ConstructEvent(request.Json, request.SignatureHeader, _config["StripeSettings:WhSecret"]);
        var intent = (PaymentIntent)stripeEvent.Data.Object;

        switch (stripeEvent.Type)
        {
            case "payment_intent.succeeded":
                _logger.LogInformation("Payment succeeded - intent id: {id}", intent.Id);
                await _paymentService.UpdateOrderPaymentSucceeded(intent.Id, cancellationToken);
                break;
            case "payment_intent.payment_failed":
                _logger.LogWarning("Payment failed - intent id: {id}", intent.Id);
                await _paymentService.UpdateOrderPaymentFailed(intent.Id, cancellationToken);
                break;

        }

        return Unit.Value;
    }
}
