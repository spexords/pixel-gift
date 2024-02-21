using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Items.Commands.UpdateItem;

public record UpdateItemCommand(
    Guid Id,
    string? Name,
    string? PolishName,
    Guid? CategoryId,
    string? Base64Image,
    int? Quantity,
    decimal? UnitPrice
    ) : ICommand<Unit>;
