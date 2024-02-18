using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Items.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Items.Handlers;

public class UpdateItemHandler : ICommandHandler<UpdateItemCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<UpdateItemHandler> _logger;

    public UpdateItemHandler(PixelGiftContext context, ILogger<UpdateItemHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(UpdateItemCommand request, CancellationToken cancellationToken)
    {
        var item = await _context.Items.FindAsync(request.Id);

        if (item is null)
        {
            _logger.LogWarning($"Could not find {nameof(Item)} with id: {request.Id}");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(Item)} with id: {request.Id}" });
        }

        item.Name = request.Name ?? item.Name;
        item.PolishName = request.PolishName ?? item.PolishName;
        item.Base64Image = request.Base64Image ?? item.Base64Image;
        item.Quantity = request.Quantity ?? item.Quantity;
        item.UnitPrice = request.UnitPrice ?? item.UnitPrice;
        item.UpdatedAt = DateTime.Now;

        if (request.CategoryId is not null)
        {
            var category = await _context.Categories.FindAsync(request.CategoryId);

            if (category is null)
            {
                _logger.LogWarning($"Could not find {nameof(Category)} with id: {request.CategoryId}");
                throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(Category)} with id: {request.CategoryId}" });
            }

            item.Category = category;
        }

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"Item with id {request.Id} updated successfully.");

        return Unit.Value;
    }
}
