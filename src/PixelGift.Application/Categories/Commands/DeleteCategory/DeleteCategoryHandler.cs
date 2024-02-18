using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Categories.Commands.DeleteCategory;

public class DeleteCategoryHandler : ICommandHandler<DeleteCategoryCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<DeleteCategoryHandler> _logger;

    public DeleteCategoryHandler(PixelGiftContext context, ILogger<DeleteCategoryHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Deleting {nameof(Category)} with id: {request.Id}");

        var category = await _context.Categories.FindAsync(request.Id);

        if (category is null)
        {
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(Category)} with id: {request.Id}." });
        }

        _context.Categories.Remove(category);

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(Category)} with id {request.Id} deleted successfully.");

        return Unit.Value;
    }
}
