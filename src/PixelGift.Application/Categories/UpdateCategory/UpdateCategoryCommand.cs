using MediatR;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Categories.GetCategory;

namespace PixelGift.Application.Categories.UpdateCategory;

public record UpdateCategoryCommand(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields) : ICommand<Unit>;