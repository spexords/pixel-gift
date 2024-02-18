using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.PromoCodes.Dtos;

namespace PixelGift.Application.PromoCodes.Queries;

public record GetPromoCodesQuery() : IQuery<IEnumerable<PromoCodeDto>>;
