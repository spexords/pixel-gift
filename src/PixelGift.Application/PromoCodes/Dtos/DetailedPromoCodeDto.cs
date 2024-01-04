namespace PixelGift.Application.PromoCodes.Dtos;

public record DetailedPromoCodeDto(Guid Id, string Code, decimal Discount, DateTime Expiry, Guid CategoryId);
