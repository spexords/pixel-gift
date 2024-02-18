using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.Orders.Queries.GetOrders;

public record GetOrdersQuery(string? Status, int? CustomerOrderId) : IQuery<IEnumerable<OrderDto>>;
