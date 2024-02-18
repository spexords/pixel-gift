using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.PromoCodes.Commands;

public record CreatePromoCodeCommand(Guid Id, string Code, decimal Discount, DateTime Expiry, Guid CategoryId) : ICommand<Unit>;
