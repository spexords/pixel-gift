namespace PixelGift.Application.PromoCodes.Dtos;

public record PromoCodeDto(Guid Id, string Code, decimal Discount, DateTime Expiry, string Category);
