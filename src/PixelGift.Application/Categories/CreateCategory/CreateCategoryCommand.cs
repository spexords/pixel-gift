using MediatR;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Categories.GetCategory;

namespace PixelGift.Application.Categories.CreateCategory;

public record CreateCategoryCommand(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields) : ICommand<Unit>;
