using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Dtos;
using PixelGift.Core.Entities;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<OrderService> _logger;

    public OrderService(PixelGiftContext context, ILogger<OrderService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<OrderSummary> GetOrderSummary(
            IEnumerable<Item> items,
            Dictionary<Guid, int> basketItems,
            Dictionary<Guid, string> promoCodes,
            CancellationToken cancellationToken)
    {
        _logger.LogInformation("Calculating order summary");

        var validPromoCodes = await GetValidPromoCodes(promoCodes, cancellationToken);
        var subtotal = 0m;
        var discount = 0m;
        var total = 0m;

        foreach (var grouppedItems in items.GroupBy(i => i.CategoryId))
        {
            var categoryId = grouppedItems.Key;

            _logger.LogInformation("Calculating subtotal and discount for CategoryId: {category}", categoryId);

            var validPromoCode = validPromoCodes.FirstOrDefault(p => p.CategoryId == categoryId);

            var categorySubtotal = grouppedItems.Sum(i => basketItems[i.Id] * i.UnitPrice);

            if (validPromoCode is not null)
            {
                _logger.LogInformation("Found valid PromoCode");
                discount += Math.Round(categorySubtotal * validPromoCode.Discount, 2);
            }

            subtotal += categorySubtotal;
        }

        total = subtotal - discount;

        return new OrderSummary(subtotal, discount, total);
    }

    private async Task<IEnumerable<PromoCode>> GetValidPromoCodes(Dictionary<Guid, string> promoCodes, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Fetching valid PromoCodes from database");
        var validPromoCodes = await _context.PromoCodes
            .AsNoTracking()
            .Where(p => DateTime.Now < p.Expiry)
            .ToListAsync(cancellationToken);

        var validRequestedPromoCodes = new List<PromoCode>();

        foreach ((var categoryId, var code) in promoCodes)
        {
            var validPromoCode = validPromoCodes.FirstOrDefault(p => p.CategoryId == categoryId && p.Code == code);
            if (validPromoCode is not null)
            {
                validRequestedPromoCodes.Add(validPromoCode);
            }
        }

        return validRequestedPromoCodes;
    }
}
