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

        var promoCode = new PromoCode
        {
            Id = request.Id,
            Code = request.Code,
            Expiry = request.Expiry
        };

        _context.PromoCodes.Add(promoCode);

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(PromoCode)} with id {request.Id} created successfully.");

        return Unit.Value;
    }
}
