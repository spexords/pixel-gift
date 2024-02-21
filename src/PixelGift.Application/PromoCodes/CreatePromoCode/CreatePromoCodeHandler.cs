using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.PromoCodes.CreatePromoCode;

public class CreatePromoCodeHandler : ICommandHandler<CreatePromoCodeCommand, Unit>
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
            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"{nameof(PromoCode)}: {request.Code} already exsists" });
        }

        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
        {
            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Could not find {nameof(Category)}: {request.CategoryId}" });
        }

        if (!(request.Discount > 0 && request.Discount < 1.0m))
        {
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

        _logger.LogInformation("{entity} with id {request.Id} created successfully.", nameof(PromoCode));

        return Unit.Value;
    }
}
