using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Items.Commands;

public record CreateItemCommand(
    Guid Id, 
    string Name, 
    string PolishName, 
    string Base64Image, 
    int Quantity, 
    decimal UnitPrice,
    Guid CategoryId) : ICommand<Unit>;
