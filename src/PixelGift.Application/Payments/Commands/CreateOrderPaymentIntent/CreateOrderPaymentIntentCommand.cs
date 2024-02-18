using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Payments.Commands.CreateOrderPaymentIntent;

public record CreateOrderPaymentIntentCommand(
    Dictionary<Guid, int> BasketItems,
    Dictionary<Guid, string> PromoCodes)
    : ICommand<OrderPaymentIntent>;
