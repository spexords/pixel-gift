using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Categories.Dtos;
using PixelGift.Application.Categories.Queries;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Categories.Handlers;

public class GetCategoryHandler : IQueryHandler<GetCategoryQuery, DetailedCategoryDto>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetCategoryHandler> _logger;

    public GetCategoryHandler(PixelGiftContext context, ILogger<GetCategoryHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<DetailedCategoryDto> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting {item}: {id} from database", nameof(Category), request.Id);

        var category = await _context.Categories
            .Include(c => c.FormFields)
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category is null)
        {
            _logger.LogWarning($"Category with Id {request.Id} not found.");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find {nameof(Category)} with id: {request.Id}." });
        }

        return new DetailedCategoryDto
        (
            category.Id,
            category.Name,
            category.FormFields.Select(f => new FormFieldDto(f.Id, f.Name, f.Type.ToString(), GetFormFieldOptions(f.Options)))
        );
    }

    private IEnumerable<string> GetFormFieldOptions(string? options)
    {
        if (options is null)
        {
            return Array.Empty<string>();
        }

        return options.Split(',').Select(o => o.Trim()).ToList();
    }
}