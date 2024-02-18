using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.PromoCodes.CreatePromoCode;

public record CreatePromoCodeCommand(Guid Id, string Code, decimal Discount, DateTime Expiry, Guid CategoryId) : ICommand<Unit>;
