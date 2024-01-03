using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.PromoCodes.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.PromoCodes.Handlers;

public class UpdatePromoCodeHandler : IRequestHandler<UpdatePromoCodeCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<UpdatePromoCodeHandler> _logger;

    public UpdatePromoCodeHandler(PixelGiftContext context, ILogger<UpdatePromoCodeHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(UpdatePromoCodeCommand request, CancellationToken cancellationToken)
    {
        var promoCode = await _context.PromoCodes.SingleOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if(promoCode is null)
        {
            _logger.LogWarning($"Could not find {nameof(PromoCode)} with id: {request.Id}");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(PromoCode)} with id: {request.Id}." });
        }

        promoCode.Expiry = request.Expiry;
        promoCode.Code = request.Code ?? promoCode.Code;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(PromoCode)} with id {request.Id} updated successfully.");

        return Unit.Value;
    }
}
