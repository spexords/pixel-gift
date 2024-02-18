using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Application.Items.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Items.Handlers;

public class CreateItemHandler : ICommandHandler<CreateItemCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<CreateItemHandler> _logger;

    public CreateItemHandler(PixelGiftContext context, ILogger<CreateItemHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(CreateItemCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating new item for category id: {category}", request.CategoryId);

        var category = await _context.Categories.FindAsync(request.CategoryId);

        if (category is null)
        {
            _logger.LogWarning("Category with id: {Category} does not exist", request.CategoryId);
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Category with id: {request.CategoryId} does not exist" });
        }

        _logger.LogInformation("Adding a new item to the database. Item Name: {ItemName}", request.Name);
        _context.Add(new Item
        {
            Id = request.Id,
            Category = category,
            Name = request.Name,
            PolishName = request.PolishName,
            Base64Image = request.Base64Image,
            Quantity = request.Quantity,
            UnitPrice = request.UnitPrice
        });

        await _context.SaveChangesAsync();

        return Unit.Value;
    }
}
