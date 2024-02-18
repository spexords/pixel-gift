using PixelGift.Core.Messaging.Events;

namespace PixelGift.Application.Payments.Events.OrderPaymentSucceeded;

public record OrderPaymentSucceededEvent(string PaymentIntentId) : IIntegrationEvent;
