using MediatR;
using PixelGift.Application.Orders.Dtos;

namespace PixelGift.Application.Orders.Commands;

public record CreateOrderIntentCommand(
    Dictionary<Guid, int> BasketItems, 
    Dictionary<Guid, string> PromoCodes) 
    : IRequest<OrderIntentDto>;