using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.PromoCodes.DeletePromoCode;

public record DeletePromoCodeCommand(Guid Id) : ICommand<Unit>;