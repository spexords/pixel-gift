using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Categories.Commands;

public record DeleteCategoryCommand(Guid Id) : ICommand<Unit>;
