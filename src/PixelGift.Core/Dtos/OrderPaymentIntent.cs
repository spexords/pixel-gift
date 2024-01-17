using PixelGift.Core.Dtos;

namespace PixelGift.Core.Dtos;

public record OrderPaymentIntent(OrderSummary OrderSummary, string PaymentIntentId, string ClientSecret);