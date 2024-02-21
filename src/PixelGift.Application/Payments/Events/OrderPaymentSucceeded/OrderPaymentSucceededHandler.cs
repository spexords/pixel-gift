using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Interfaces;
using PixelGift.Core.Messaging.Events;
using PixelGift.Infrastructure.Data;
using System.Text;

namespace PixelGift.Application.Payments.Events.OrderPaymentSucceeded;

public class OrderPaymentSucceededHandler : IIntegrationEventHandler<OrderPaymentSucceededEvent>
{
    private readonly PixelGiftContext _context;
    private readonly IMailService _mailService;
    private readonly IConfiguration _config;
    private readonly ILogger<OrderPaymentSucceededHandler> _logger;

    public OrderPaymentSucceededHandler(PixelGiftContext context, IMailService mailService, IConfiguration config, ILogger<OrderPaymentSucceededHandler> logger)
    {
        _context = context;
        _mailService = mailService;
        _config = config;
        _logger = logger;
    }

    public async Task Handle(OrderPaymentSucceededEvent notification, CancellationToken cancellationToken)
    {
        var order = await _context.Orders
            .Include(o => o.OrderCategories)
            .ThenInclude(o => o.OrderItems)
            .SingleOrDefaultAsync(o => o.PaymentIntentId == notification.PaymentIntentId, cancellationToken);

        if (order is null)
        {
            _logger.LogError("Could not find order with payment intent id: {id}", notification.PaymentIntentId);
            return;
        }

        foreach (var orderItem in order.OrderCategories.SelectMany(o => o.OrderItems))
        {
            var item = await _context.Items.SingleOrDefaultAsync(i => i.Id == orderItem.ItemId);

            if (item is null)
            {
                continue;
            }

            _logger.LogInformation("Decreasing item ({id}) by quantity: {q}", orderItem.ItemId, orderItem.Quantity);

            item.Quantity -= orderItem.Quantity;
        }

        order.Status = OrderStatus.PaymentReceived;

        await TrySendEmail(order);

        await _context.SaveChangesAsync();
    }

    private async Task TrySendEmail(Order order)
    {
        var subject = $"Payment Confirmation - Order #{order.CustomerOrderId}";
        var content = GeneratePaymentConfirmationMessage(order);

        var mailSentResult = await _mailService.SendEmailAsync(order.Email, subject, content);

        if (mailSentResult)
        {
            _context.Messages.Add(new Message
            {
                CreatedAt = DateTime.Now,
                Subject = subject,
                Content = content,
                OrderId = order.Id
            });
        }
    }

    private string GeneratePaymentConfirmationMessage(Order order)
    {
        var orderItems = new StringBuilder();

        foreach (var category in order.OrderCategories)
        {
            foreach (var item in category.OrderItems)
            {
                orderItems.AppendLine($"- {category.CategoryName.ToUpperInvariant()}: {item.Quantity}x {item.ItemName}");
            }
        }

        return $"""
            We are thrilled to inform you that your payment for Order #{order.CustomerOrderId} has been successfully processed! Your purchase is now confirmed.

            **Order Details:**
            - Order ID: {order.CustomerOrderId}
            - Payment Amount: {order.Total.ToString("0.00")} PLN
            {orderItems.ToString()}

            Your order is currently being processed, and we will notify you once it has been completed. If you have any questions or concerns, feel free to reach out to our customer support team.

            Thank you for choosing {_config["OrganizationInfo:CompanyName"]}!

            Best Regards,
            {_config["OrganizationInfo:CompanyName"]} Team
            """;
    }
}