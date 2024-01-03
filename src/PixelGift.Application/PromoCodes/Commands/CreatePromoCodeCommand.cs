using MediatR;

namespace PixelGift.Application.PromoCodes.Commands;

public record CreatePromoCodeCommand(Guid Id, string Code, DateTime Expiry) : IRequest<Unit>;
