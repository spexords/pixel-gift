using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Queries;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Items.GetItemsByCategory;

public class GetItemsByCategoryHandler : IQueryHandler<GetItemsByCategoryQuery, IEnumerable<ItemDto>>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetItemsByCategoryHandler> _logger;

    public GetItemsByCategoryHandler(PixelGiftContext context, ILogger<GetItemsByCategoryHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<ItemDto>> Handle(GetItemsByCategoryQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting items for category id: {category} from database", request.CategoryId);

        if (!await _context.Categories.AnyAsync(c => c.Id == request.CategoryId, cancellationToken))
        {
            _logger.LogWarning("Category with id: {Category} does not exist", request.CategoryId);
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Category with id: {request.CategoryId} does not exist" });
        }

        var items = await _context.Items
            .Where(i => i.CategoryId == request.CategoryId && i.Quantity > 0)
            .Select(i => new ItemDto(i.Id, request.Language == "en" ? i.Name : i.PolishName, i.Base64Image, i.UnitPrice))
            .ToListAsync(cancellationToken);

        return items;
    }
}
