using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Items.Commands.CreateItem;

public record CreateItemCommand(
    Guid Id,
    string Name,
    string PolishName,
    string Base64Image,
    int Quantity,
    decimal UnitPrice,
    Guid CategoryId) : ICommand<Unit>;
