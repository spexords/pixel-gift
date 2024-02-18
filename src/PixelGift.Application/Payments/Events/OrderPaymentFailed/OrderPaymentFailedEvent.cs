using PixelGift.Core.Messaging.Events;

namespace PixelGift.Application.Payments.Events.OrderPaymentFailed;

public record OrderPaymentFailedEvent(string PaymentIntentId) : IIntegrationEvent;
