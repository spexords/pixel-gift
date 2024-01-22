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

        if (promoCode is null)
        {
            _logger.LogWarning($"Could not find {nameof(PromoCode)} with id: {request.Id}");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(PromoCode)} with id: {request.Id}." });
        }

        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
        {
            _logger.LogWarning("Could not find {item} - id: {id}", nameof(Category), request.CategoryId);

            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Could not find {nameof(Category)}: {request.CategoryId}" });
        }

        if (!(request.Discount > 0 && request.Discount < 1.0m))
        {
            _logger.LogWarning("Invalid {promo} discount value", nameof(PromoCode));

            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Invalid {nameof(PromoCode)} discount value - it should be between 0 and 1.0" });
        }

        promoCode.Expiry = request.Expiry;
        promoCode.Code = request.Code;
        promoCode.Discount = request.Discount;
        promoCode.CategoryId = request.CategoryId;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(PromoCode)} with id {request.Id} updated successfully.");

        return Unit.Value;
    }
}
