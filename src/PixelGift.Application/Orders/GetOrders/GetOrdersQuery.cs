using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.Orders.GetOrders;

public record GetOrdersQuery(string? Status, int? CustomerOrderId) : IQuery<IEnumerable<OrderDto>>;
