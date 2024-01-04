using MediatR;
using PixelGift.Application.PromoCodes.Dtos;

namespace PixelGift.Application.PromoCodes.Queries;

public record GetPromoCodeQuery(Guid Id) : IRequest<DetailedPromoCodeDto>;
