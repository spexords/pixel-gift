using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Interfaces;
using Stripe;
using PixelGift.Application.Payments.Events.OrderPaymentSucceeded;
using PixelGift.Application.Payments.Events.OrderPaymentFailed;

namespace PixelGift.Application.Payments.Commands.StripeOrderPaidWebhook;

public class StripeOrderPaidWebhookHandler : ICommandHandler<StripeOrderPaidWebhookCommand, Unit>
{
    private readonly ILogger<StripeOrderPaidWebhookHandler> _logger;
    private readonly IConfiguration _config;
    private readonly IMediator _mediator;

    public StripeOrderPaidWebhookHandler(IConfiguration config, IMediator mediator, ILogger<StripeOrderPaidWebhookHandler> logger)
    {
        _config = config;
        _mediator = mediator;
        _logger = logger;
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
                await _mediator.Publish(new OrderPaymentSucceededEvent(intent.Id));
                break;
            case "payment_intent.payment_failed":
                _logger.LogWarning("Payment failed - intent id: {id}", intent.Id);
                await _mediator.Publish(new OrderPaymentFailedEvent(intent.Id));
                break;
        }

        _logger.LogInformation("Stripe Payment handled");

        return Unit.Value;
    }
}
