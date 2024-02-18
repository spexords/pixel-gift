using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Orders.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Exceptions;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Orders.Handlers;

public class SendMessageHandler : ICommandHandler<SendMessageCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<SendMessageHandler> _logger;
    private readonly IMailService _mailService;

    public SendMessageHandler(PixelGiftContext context, ILogger<SendMessageHandler> logger, IMailService mailService)
    {
        _context = context;
        _logger = logger;
        _mailService = mailService;
    }

    public async Task<Unit> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Checking if order id: {id} exists", request.OrderId);
        var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == request.OrderId);
        
        if (order is null)
        {
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find {nameof(Order)} with id: {request.OrderId}." });
        }

        var result = await _mailService.SendEmailAsync(order.Email, request.Subject, request.Content);

        if(!result)
        {
            throw new BaseApiException(HttpStatusCode.ServiceUnavailable, new { Message = $"Could not send email to: {order.Email} for order id: {order.Id}" });
        }

        _context.Messages.Add(new Message
        {
            OrderId = order.Id,
            Subject = request.Subject,
            Content = request.Content
        });

        await _context.SaveChangesAsync();

        return Unit.Value;
    }
}
