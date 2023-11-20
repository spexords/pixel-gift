using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Items.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Items.Handlers;

public class DeleteItemHandler : IRequestHandler<DeleteItemCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<CreateItemHandler> _logger;

    public DeleteItemHandler(PixelGiftContext context, ILogger<CreateItemHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Deleting item with Id: {request.Id}");

        var item = await _context.Items.FindAsync(request.Id);

        if (item is null)
        {
            _logger.LogWarning($"Item with Id {request.Id} not found.");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(Item)} with id: {request.Id}." });
        }

        _context.Items.Remove(item);

        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation($"Item with Id: {request.Id} deleted successfully");

        return Unit.Value;
    }
}