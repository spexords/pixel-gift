using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Oders.Queries;
using PixelGift.Application.Orders.Dtos;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;
using System.Text.Json;

namespace PixelGift.Application.Orders.Handlers;

public class GetOrderHandler : IRequestHandler<GetOrderQuery, DetailedOrderDto>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetOrderHandler> _logger;

    public GetOrderHandler(PixelGiftContext context, ILogger<GetOrderHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<DetailedOrderDto> Handle(GetOrderQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting {item}: {id} from database", nameof(Order), request.Id);

        var order = await _context.Orders
            .Include(o => o.Messages)
            .Include(o => o.OrderCategories)
            .ThenInclude(c => c.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);

        if(order is null)
        {
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find {nameof(Order)} with id: {request.Id}." });
        }

        return MapOrder(order);
    }

    private DetailedOrderDto MapOrder(Order order) =>
        new DetailedOrderDto
        (
            order.Id,
            order.CreatedAt!.Value,
            order.UpdatedAt,
            order.CustomerOrderId,
            order.Email,
            order.Status.ToString(),
            order.PaymentIntentId,
            order.OrderCategories.Select(c => new DetailedOrderCategoryDto
            (
                c.CategoryName,
                c.PromoCode,
                c.Subtotal,
                c.Discount,
                c.Total,
                JsonSerializer.Deserialize<IEnumerable<FormFieldDataDto>>(c.Metadata)!,
                c.OrderItems.Select(i => new DetailedOrderItemDto(i.ItemName, i.Quantity, i.UnitPrice))
            )),
            order.Messages.Select(m => new MailMessageDto
            (
                m.Subject,
                m.CreatedAt!.Value,
                m.Content
            )),
            order.Subtotal,
            order.Discount,
            order.Total
        );
}