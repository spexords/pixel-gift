using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Orders.Commands.GenerateOrderPreview;

public record GenerateOrderPreviewCommand(
    Dictionary<Guid, int> BasketItems,
    Dictionary<Guid, string> PromoCodes,
    string Language)
    : ICommand<OrderPreviewDto>;
