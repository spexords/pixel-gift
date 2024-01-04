using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Application.PromoCodes.Dtos;
using PixelGift.Application.PromoCodes.Queries;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.PromoCodes.Handlers;

public class GetPromoCodeHandler : IRequestHandler<GetPromoCodeQuery, PromoCodeDto>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetPromoCodeHandler> _logger;

    public GetPromoCodeHandler(PixelGiftContext context, ILogger<GetPromoCodeHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<PromoCodeDto> Handle(GetPromoCodeQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting {item}: {id} from database", nameof(PromoCode), request.Id);

        var promoCode = await _context.PromoCodes.FindAsync(request.Id);

        if (promoCode is null)
        {
            _logger.LogWarning($"Category with Id {request.Id} not found.");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find {nameof(PromoCode)} with id: {request.Id}." });
        }

        return new PromoCodeDto(promoCode.Id, promoCode.Code, promoCode.Discount, promoCode.Expiry);
    }
}