using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Categories.DeleteCategory;

public record DeleteCategoryCommand(Guid Id) : ICommand<Unit>;
