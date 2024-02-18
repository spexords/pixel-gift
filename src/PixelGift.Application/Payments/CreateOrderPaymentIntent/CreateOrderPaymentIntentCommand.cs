using PixelGift.Application.Abstractions.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Payments.CreateOrderPaymentIntent;

public record CreateOrderPaymentIntentCommand(
    Dictionary<Guid, int> BasketItems,
    Dictionary<Guid, string> PromoCodes)
    : ICommand<OrderPaymentIntent>;
