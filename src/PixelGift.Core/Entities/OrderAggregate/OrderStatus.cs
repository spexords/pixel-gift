namespace PixelGift.Core.Entities.OrderAggregate;

public enum OrderStatus
{
    New,
    PaymentFailed,
    PaymentReceived,
    InProgress,
    Finished,
}
