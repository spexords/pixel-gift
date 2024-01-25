using MediatR;

namespace PixelGift.Application.Orders.Commands;

public record UpdateOrderCommand(Guid Id, string Status) : IRequest<Unit>;