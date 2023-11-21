using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Categories.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Categories.Handlers;

public class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetCategoriesHandler> _logger;

    public CreateCategoryHandler(PixelGiftContext context, ILogger<GetCategoriesHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Checking in the database if the nameof already exists");

        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower(), cancellationToken);

        if (category is not null)
        {
            _logger.LogWarning("Attempted to create a category that already exists. Category Name: {CategoryName}", request.Name);

            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Category: {request.Name} already exsists" });
        }

        _logger.LogInformation("Adding a new category to the database. Category Name: {CategoryName}", request.Name);

        _context.Categories.Add(new Category { Id = request.Id, Name = request.Name });

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
