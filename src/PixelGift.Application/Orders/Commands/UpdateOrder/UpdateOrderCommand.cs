using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Orders.Commands.UpdateOrder;

public record UpdateOrderCommand(Guid Id, string Status) : ICommand<Unit>;