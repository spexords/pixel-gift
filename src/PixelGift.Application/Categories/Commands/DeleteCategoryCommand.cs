using MediatR;

namespace PixelGift.Application.Categories.Commands;

public record DeleteCategoryCommand(Guid Id) : IRequest<Unit>;
