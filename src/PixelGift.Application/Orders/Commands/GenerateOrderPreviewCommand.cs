using MediatR;
using PixelGift.Application.Orders.Dtos;
using PixelGift.Application.PromoCodes.Dtos;

namespace PixelGift.Application.Orders.Commands;

public record GenerateOrderPreviewCommand(Dictionary<Guid, int> BasketItems, IEnumerable<PromoCodeRequestDto> PromoCodes) : IRequest<OrderPreviewDto>;
