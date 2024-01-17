namespace PixelGift.Application.Orders.Dtos;

public record OrderIntentDto(OrderSummary OrderSummary, string PaymentIntentId, string ClientSecret);