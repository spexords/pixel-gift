﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Messaging.Queries;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.PromoCodes.GetPromoCodes;

public class GetPromoCodesHandler : IQueryHandler<GetPromoCodesQuery, IEnumerable<PromoCodeDto>>
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
            .Include(c => c.Category)
            .Select(c => new PromoCodeDto(c.Id, c.Code, c.Discount, c.Expiry, c.Category.Name))
            .ToListAsync(cancellationToken);

        return promoCodes;
    }
}
