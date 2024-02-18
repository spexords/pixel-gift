namespace PixelGift.Application.Orders.GetOrders;

public record OrderDto(Guid Id, DateTime CreatedAt, int CustomerOrderId, string Email, string Status, string PaymentIntentId, decimal Total);
