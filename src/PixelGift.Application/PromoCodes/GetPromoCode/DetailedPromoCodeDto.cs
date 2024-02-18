namespace PixelGift.Application.PromoCodes.GetPromoCode;

public record DetailedPromoCodeDto(Guid Id, string Code, decimal Discount, DateTime Expiry, Guid CategoryId);
