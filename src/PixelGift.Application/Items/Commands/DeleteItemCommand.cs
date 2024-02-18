using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Items.Commands;

public record DeleteItemCommand(Guid Id) : ICommand<Unit>;