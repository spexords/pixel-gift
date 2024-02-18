using MediatR;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Categories.Dtos;

namespace PixelGift.Application.Categories.Commands;

public record UpdateCategoryCommand(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields) : ICommand<Unit>;