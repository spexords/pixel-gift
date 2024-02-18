using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Messaging.Events;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.Payments.Events.OrderPaymentFailed;

public class OrderPaymentFailedHandler : IIntegrationEventHandler<OrderPaymentFailedEvent>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<OrderPaymentFailedHandler> _logger;

    public OrderPaymentFailedHandler(PixelGiftContext context, ILogger<OrderPaymentFailedHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Handle(OrderPaymentFailedEvent notification, CancellationToken cancellationToken)
    {
        var order = await _context.Orders.SingleOrDefaultAsync(o => o.PaymentIntentId == notification.PaymentIntentId, cancellationToken);

        if (order is null)
        {
            _logger.LogError("Could not find order with payment intent id: {id}", notification.PaymentIntentId);
            return;
        }

        order.Status = OrderStatus.PaymentFailed;

        await _context.SaveChangesAsync();
    }
}