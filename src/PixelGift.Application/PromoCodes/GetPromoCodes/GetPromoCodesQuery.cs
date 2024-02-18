using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.PromoCodes.GetPromoCodes;

public record GetPromoCodesQuery() : IQuery<IEnumerable<PromoCodeDto>>;
