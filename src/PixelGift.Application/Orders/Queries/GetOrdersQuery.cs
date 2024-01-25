using MediatR;
using PixelGift.Application.Orders.Dtos;
using PixelGift.Core.Entities.OrderAggregate;

namespace PixelGift.Application.Oders.Queries;

public record GetOrdersQuery(string? Status, int? CustomerOrderId) : IRequest<IEnumerable<OrderDto>>;
