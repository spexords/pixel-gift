using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.PromoCodes.Dtos;

namespace PixelGift.Application.PromoCodes.Queries;

public record GetPromoCodeQuery(Guid Id) : IQuery<DetailedPromoCodeDto>;
