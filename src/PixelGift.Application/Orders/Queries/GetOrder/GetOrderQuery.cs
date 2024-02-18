using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.Orders.Queries.GetOrder;

public record GetOrderQuery(Guid Id) : IQuery<DetailedOrderDto>;