using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.PromoCodes.Commands;

public record DeletePromoCodeCommand(Guid Id) : ICommand<Unit>;