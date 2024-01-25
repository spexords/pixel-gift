using MediatR;
using PixelGift.Application.Orders.Dtos;

namespace PixelGift.Application.Oders.Queries;

public record GetOrderQuery(Guid Id) : IRequest<DetailedOrderDto>;