using MediatR;

namespace PixelGift.Application.Categories.Commands;

public record CreateCategoryCommand(Guid Id, string? Name) : IRequest<Unit>;
