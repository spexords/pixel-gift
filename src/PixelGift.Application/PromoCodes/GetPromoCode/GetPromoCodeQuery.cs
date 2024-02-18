using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.PromoCodes.GetPromoCode;

public record GetPromoCodeQuery(Guid Id) : IQuery<DetailedPromoCodeDto>;
