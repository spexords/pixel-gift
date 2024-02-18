using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Items.UpdateItem;

public record UpdateItemCommand(
    Guid Id,
    string? Name,
    string? PolishName,
    Guid? CategoryId,
    string? Base64Image,
    int? Quantity,
    decimal? UnitPrice
    ) : ICommand<Unit>;
