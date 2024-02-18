using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.PromoCodes.UpdatePromoCode;

public record UpdatePromoCodeCommand(Guid Id, string Code, decimal Discount, DateTime Expiry, Guid CategoryId) : ICommand<Unit>;