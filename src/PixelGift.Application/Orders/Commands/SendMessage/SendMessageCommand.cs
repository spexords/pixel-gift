using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Orders.Commands.SendMessage;

public record SendMessageCommand(Guid? OrderId, string Subject, string Content) : ICommand<Unit>;