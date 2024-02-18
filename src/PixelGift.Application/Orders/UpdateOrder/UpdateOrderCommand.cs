using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Orders.UpdateOrder;

public record UpdateOrderCommand(Guid Id, string Status) : ICommand<Unit>;