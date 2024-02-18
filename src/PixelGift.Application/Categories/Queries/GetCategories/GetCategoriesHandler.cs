using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Messaging.Queries;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.Categories.Queries.GetCategories;

public class GetCategoriesHandler : IQueryHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetCategoriesHandler> _logger;

    public GetCategoriesHandler(PixelGiftContext context, ILogger<GetCategoriesHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting categories from database");

        var categories = await _context.Categories
            .Select(c => new CategoryDto(c.Id, c.Name))
            .ToListAsync(cancellationToken);

        return categories;
    }
}
