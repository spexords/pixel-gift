using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.PromoCodes.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.PromoCodes.Handlers;

public class CreatePromoCodeHandler : IRequestHandler<CreatePromoCodeCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<CreatePromoCodeHandler> _logger;

    public CreatePromoCodeHandler(PixelGiftContext context, ILogger<CreatePromoCodeHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(CreatePromoCodeCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Checking in the database if the {code} already exists", request.Code);

        var codeExists = await _context.PromoCodes.AnyAsync(c => c.Code == request.Code, cancellationToken);

        if (codeExists)
        {
            _logger.LogWarning("Attempted to create a {item} that already exists - {code}", nameof(PromoCode), request.Code);

            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"{nameof(PromoCode)}: {request.Code} already exsists" });
        }

        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == request.CategoryId, cancellationToken);

        if(!categoryExists)
        {
            _logger.LogWarning("Could not find {item} - id: {id}", nameof(Category), request.CategoryId);

            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Could not find {nameof(Category)}: {request.CategoryId}" });
        }

        if(!(request.Discount > 0 && request.Discount < 1.0m))
        {
            _logger.LogWarning("Invalid {promo} discount value", nameof(PromoCode));

            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Invalid {nameof(PromoCode)} discount value - it should be between 0 and 1.0" });
        }

        var promoCode = new PromoCode
        {
            Id = request.Id,
            Code = request.Code,
            Discount = request.Discount,
            Expiry = request.Expiry,
            CategoryId = request.CategoryId
        };

        _context.PromoCodes.Add(promoCode);

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(PromoCode)} with id {request.Id} created successfully.");

        return Unit.Value;
    }
}
