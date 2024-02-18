using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Orders.Dtos;

namespace PixelGift.Application.Oders.Queries;

public record GetOrdersQuery(string? Status, int? CustomerOrderId) : IQuery<IEnumerable<OrderDto>>;
