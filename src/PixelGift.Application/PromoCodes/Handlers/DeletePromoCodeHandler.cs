using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.PromoCodes.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.PromoCodes.Handlers;

public class DeletePromoCodeHandler : ICommandHandler<DeletePromoCodeCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<DeletePromoCodeHandler> _logger;

    public DeletePromoCodeHandler(PixelGiftContext context, ILogger<DeletePromoCodeHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(DeletePromoCodeCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Deleting {nameof(PromoCode)} with id: {request.Id}");

        var promoCode = await _context.PromoCodes.FindAsync(request.Id);

        if (promoCode is null)
        {
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(PromoCode)} with id: {request.Id}." });
        }

        _context.PromoCodes.Remove(promoCode);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("{entity} with id {request.Id} deleted successfully.", nameof(PromoCode));

        return Unit.Value;
    }
}