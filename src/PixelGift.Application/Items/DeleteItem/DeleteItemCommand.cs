using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Items.DeleteItem;

public record DeleteItemCommand(Guid Id) : ICommand<Unit>;