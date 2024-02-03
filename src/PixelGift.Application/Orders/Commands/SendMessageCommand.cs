using MediatR;

namespace PixelGift.Application.Orders.Commands;

public record SendMessageCommand(Guid? OrderId, string Subject, string Content) : IRequest<Unit>;