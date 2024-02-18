using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Oders.Queries;
using PixelGift.Application.Orders.Dtos;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.Orders.Handlers;

public class GetOrdersHandler : IQueryHandler<GetOrdersQuery, IEnumerable<OrderDto>>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetOrdersHandler> _logger;

    public GetOrdersHandler(PixelGiftContext context, ILogger<GetOrdersHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<OrderDto>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting orders from database");

        var orders = _context.Orders.AsQueryable().AsNoTracking();

        if(request.Status is not null)
        {
            var status = Enum.Parse<OrderStatus>(request.Status);
            orders = orders.Where(o => o.Status == status);
        }

        if(request.CustomerOrderId is not null)
        {
            orders = orders.Where(o => o.CustomerOrderId == request.CustomerOrderId);
        }

        var mappedOrders = await orders
            .Include(o => o.OrderCategories)
            .Select(o => new OrderDto
        (
            o.Id,
            o.CreatedAt!.Value,
            o.CustomerOrderId,
            o.Email,
            o.Status.ToString(),
            o.PaymentIntentId,
            o.Total
        )).ToListAsync(cancellationToken);

        return mappedOrders;
    }
}
