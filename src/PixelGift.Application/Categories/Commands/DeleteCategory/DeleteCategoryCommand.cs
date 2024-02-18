using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Categories.Commands.DeleteCategory;

public record DeleteCategoryCommand(Guid Id) : ICommand<Unit>;
