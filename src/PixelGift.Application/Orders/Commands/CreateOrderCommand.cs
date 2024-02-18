using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Orders.Dtos;

namespace PixelGift.Application.Orders.Commands;

public record CreateOrderCommand(
    Dictionary<Guid, int> BasketItems,
    Dictionary<Guid, string> PromoCodes,
    Dictionary<Guid, IEnumerable<FormFieldDataDto>> CategoryFormFieldsData,
    string PaymentIntentId,
    string Email) : ICommand<OrderCreated>;
