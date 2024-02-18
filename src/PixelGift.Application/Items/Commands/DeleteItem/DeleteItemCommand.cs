using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Items.Commands.DeleteItem;

public record DeleteItemCommand(Guid Id) : ICommand<Unit>;