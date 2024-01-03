using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.PromoCodes.Dtos;
using PixelGift.Application.PromoCodes.Queries;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.PromoCodes.Handlers;

public class GetPromoCodesHandler : IRequestHandler<GetPromoCodesQuery, IEnumerable<PromoCodeDto>>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetPromoCodesHandler> _logger;

    public GetPromoCodesHandler(PixelGiftContext context, ILogger<GetPromoCodesHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<PromoCodeDto>> Handle(GetPromoCodesQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting all promo codes from database.");

        var promoCodes = await _context.PromoCodes
            .AsNoTracking()
            .Select(c => new PromoCodeDto(c.Id, c.Code, c.Expiry))
            .ToListAsync(cancellationToken);

        return promoCodes;
    }
}
