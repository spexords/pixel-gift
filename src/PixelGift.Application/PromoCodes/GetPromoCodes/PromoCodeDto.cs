namespace PixelGift.Application.PromoCodes.GetPromoCodes;

public record PromoCodeDto(Guid Id, string Code, decimal Discount, DateTime Expiry, string Category);
