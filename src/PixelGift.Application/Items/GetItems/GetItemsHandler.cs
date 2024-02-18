using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Queries;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.Items.GetItems;

public class GetItemsHandler : IQueryHandler<GetItemsQuery, IEnumerable<ItemAdminDto>>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetItemsHandler> _logger;

    public GetItemsHandler(PixelGiftContext context, ILogger<GetItemsHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<ItemAdminDto>> Handle(GetItemsQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting all items from database.");

        var items = await _context.Items
            .AsNoTracking()
            .Include(i => i.Category)
            .Select(i => new ItemAdminDto(i.Id, i.Name, i.PolishName, i.Base64Image, i.Quantity, i.Category.Name))
            .ToListAsync(cancellationToken);

        return items;
    }
}
