using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Orders.Commands;
using PixelGift.Core.Entities.OrderAggregate;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Orders.Handlers;

public class UpdateOrderHandler : ICommandHandler<UpdateOrderCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<UpdateOrderHandler> _logger;

    public UpdateOrderHandler(PixelGiftContext context, ILogger<UpdateOrderHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Updating {entity} with id:{id}", nameof(Order), request.Id);

        var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == request.Id);

        if (order is null)
        {
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find {nameof(Order)} with id: {request.Id}." });
        }

        var status = Enum.Parse<OrderStatus>(request.Status);

        order.Status = status;
        order.UpdatedAt = DateTime.Now;

        await _context.SaveChangesAsync();

        return Unit.Value;
    }
}