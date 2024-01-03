using MediatR;

namespace PixelGift.Application.PromoCodes.Commands;

public record DeletePromoCodeCommand(Guid Id) : IRequest<Unit>;