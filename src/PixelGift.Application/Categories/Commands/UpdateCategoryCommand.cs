using MediatR;

namespace PixelGift.Application.Categories.Commands;

public record UpdateCategoryCommand(Guid Id, string Name) : IRequest<Unit>;