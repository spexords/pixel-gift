using MediatR;

namespace PixelGift.Application.Items.Commands;

public record DeleteItemCommand(Guid Id) : IRequest<Unit>;