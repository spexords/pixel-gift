using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Categories.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Categories.Handlers;

public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<UpdateCategoryHandler> _logger;

    public UpdateCategoryHandler(PixelGiftContext context, ILogger<UpdateCategoryHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await _context.Categories.FindAsync(request.Id);

        if (category is null)
        {
            _logger.LogWarning($"Could not find {nameof(Category)} with id: {request.Id}");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(Category)} with id: {request.Id}." });
        }

        category.Name = request.Name ?? category.Name;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(Category)} with id {request.Id} updated successfully.");

        return Unit.Value;
    }
}