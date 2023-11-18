using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Categories.Dtos;
using PixelGift.Application.Categories.Queries;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Application.Categories.Handlers;

public class GetCategoriesHandler : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
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

        var categories = await _context.Categories.ToListAsync();

        var categoryDtos = categories.Select(c => new CategoryDto { Name = c.Name, Id = c.Id });

        return categoryDtos;
    }
}
