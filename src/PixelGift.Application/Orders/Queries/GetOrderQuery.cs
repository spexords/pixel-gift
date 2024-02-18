using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Orders.Dtos;

namespace PixelGift.Application.Oders.Queries;

public record GetOrderQuery(Guid Id) : IQuery<DetailedOrderDto>;