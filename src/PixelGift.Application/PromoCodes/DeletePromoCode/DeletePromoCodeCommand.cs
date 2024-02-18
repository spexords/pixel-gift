using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.PromoCodes.DeletePromoCode;

public record DeletePromoCodeCommand(Guid Id) : ICommand<Unit>;