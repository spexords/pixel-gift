using MediatR;
using PixelGift.Application.PromoCodes.Dtos;

namespace PixelGift.Application.PromoCodes.Queries;

public record GetPromoCodesQuery() : IRequest<IEnumerable<PromoCodeDto>>;
