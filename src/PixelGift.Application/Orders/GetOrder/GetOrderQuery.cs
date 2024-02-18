using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.Orders.GetOrder;

public record GetOrderQuery(Guid Id) : IQuery<DetailedOrderDto>;