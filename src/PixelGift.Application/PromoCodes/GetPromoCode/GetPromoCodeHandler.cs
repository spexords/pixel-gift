using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Queries;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.PromoCodes.GetPromoCode;

public class GetPromoCodeHandler : IQueryHandler<GetPromoCodeQuery, DetailedPromoCodeDto>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetPromoCodeHandler> _logger;

    public GetPromoCodeHandler(PixelGiftContext context, ILogger<GetPromoCodeHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<DetailedPromoCodeDto> Handle(GetPromoCodeQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting {item}: {id} from database", nameof(PromoCode), request.Id);

        var promoCode = await _context.PromoCodes.FindAsync(request.Id);

        if (promoCode is null)
        {
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find {nameof(PromoCode)} with id: {request.Id}." });
        }

        return new DetailedPromoCodeDto(promoCode.Id, promoCode.Code, promoCode.Discount, promoCode.Expiry, promoCode.CategoryId);
    }
}