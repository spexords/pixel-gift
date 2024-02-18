using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.PromoCodes.UpdatePromoCode;

public record UpdatePromoCodeCommand(Guid Id, string Code, decimal Discount, DateTime Expiry, Guid CategoryId) : ICommand<Unit>;