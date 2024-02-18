using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Orders.Commands.CreateOrder;

public record CreateOrderCommand(
    Dictionary<Guid, int> BasketItems,
    Dictionary<Guid, string> PromoCodes,
    Dictionary<Guid, IEnumerable<FormFieldDataDto>> CategoryFormFieldsData,
    string PaymentIntentId,
    string Email) : ICommand<OrderCreated>;
