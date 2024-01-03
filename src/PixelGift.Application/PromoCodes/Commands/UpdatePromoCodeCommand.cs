using MediatR;

namespace PixelGift.Application.PromoCodes.Commands;

public record UpdatePromoCodeCommand(Guid Id, string Code, DateTime Expiry): IRequest<Unit>;