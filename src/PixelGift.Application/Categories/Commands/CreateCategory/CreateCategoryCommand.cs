using MediatR;
using PixelGift.Application.Categories.Queries.GetCategory;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Categories.Commands.CreateCategory;

public record CreateCategoryCommand(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields) : ICommand<Unit>;
