using MediatR;
using PixelGift.Core.Messaging.Commands;
using PixelGift.Application.Categories.Queries.GetCategory;

namespace PixelGift.Application.Categories.Commands.UpdateCategory;

public record UpdateCategoryCommand(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields) : ICommand<Unit>;