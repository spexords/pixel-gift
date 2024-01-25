namespace PixelGift.Application.Orders.Dtos;

public record OrderDto(Guid Id, DateTime CreatedAt, int CustomerOrderId, string Email, string Status, string PaymentIntentId, decimal Total);
