using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Orders.Dtos;

namespace PixelGift.Application.Orders.Commands;

public record GenerateOrderPreviewCommand(
    Dictionary<Guid, int> BasketItems, 
    Dictionary<Guid, string> PromoCodes, 
    string Language) 
    : ICommand<OrderPreviewDto>;
