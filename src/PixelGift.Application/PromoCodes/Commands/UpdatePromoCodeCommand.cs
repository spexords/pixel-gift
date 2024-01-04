using MediatR;

namespace PixelGift.Application.PromoCodes.Commands;

public record UpdatePromoCodeCommand(Guid Id, string Code, decimal Discount, DateTime Expiry): IRequest<Unit>;