using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Orders.GenerateOrderPreview;

public record GenerateOrderPreviewCommand(
    Dictionary<Guid, int> BasketItems,
    Dictionary<Guid, string> PromoCodes,
    string Language)
    : ICommand<OrderPreviewDto>;
