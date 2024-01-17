using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Payments.Commands;
using PixelGift.Core.Dtos;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.Payments.Handlers;

public class CreateOrderIntentHandler : IRequestHandler<CreateOrderPaymentIntentCommand, OrderPaymentIntent>
{
    private readonly IPaymentService _paymentService;
    private readonly PixelGiftContext _context;
    private readonly ILogger<CreateOrderIntentHandler> _logger;

    public CreateOrderIntentHandler(IPaymentService paymentService, PixelGiftContext context, ILogger<CreateOrderIntentHandler> logger)
    {
        _paymentService = paymentService;
        _context = context;
        _logger = logger;
    }

    public async Task<OrderPaymentIntent> Handle(CreateOrderPaymentIntentCommand request, CancellationToken cancellationToken)
    {
        var basketItemIds = request.BasketItems.Keys.Select(k => k);

        _logger.LogInformation("Creating order payment intent for item ids: {ids}", string.Join(',', request.BasketItems.Keys));

        var items = await _context.Items
          .AsNoTracking()
          .Include(i => i.Category)
          .Where(i => basketItemIds.Contains(i.Id))
          .ToListAsync(cancellationToken);

        var orderPaymentIntent = await _paymentService.CreateOrderPaymentIntent(items, request.BasketItems, request.PromoCodes, cancellationToken);

        return orderPaymentIntent;
    }
}
