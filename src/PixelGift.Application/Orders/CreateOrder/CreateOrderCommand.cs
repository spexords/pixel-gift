using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Orders.CreateOrder;

public record CreateOrderCommand(
    Dictionary<Guid, int> BasketItems,
    Dictionary<Guid, string> PromoCodes,
    Dictionary<Guid, IEnumerable<FormFieldDataDto>> CategoryFormFieldsData,
    string PaymentIntentId,
    string Email) : ICommand<OrderCreated>;
