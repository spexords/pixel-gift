using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Dtos;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.Payments.Commands.CreateOrderPaymentIntent;

public class CreateOrderPaymentIntentHandler : ICommandHandler<CreateOrderPaymentIntentCommand, OrderPaymentIntent>
{
    private readonly IPaymentService _paymentService;
    private readonly PixelGiftContext _context;
    private readonly ILogger<CreateOrderPaymentIntentHandler> _logger;

    public CreateOrderPaymentIntentHandler(IPaymentService paymentService, PixelGiftContext context, ILogger<CreateOrderPaymentIntentHandler> logger)
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
