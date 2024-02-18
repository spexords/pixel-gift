using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Items.Dtos;
using PixelGift.Application.Items.Queries;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Items.Handlers;

public class GetItemByIdHandler : IQueryHandler<GetItemByIdQuery, DetailedItemAdminDto>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<GetItemByIdHandler> _logger;

    public GetItemByIdHandler(PixelGiftContext context, ILogger<GetItemByIdHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<DetailedItemAdminDto> Handle(GetItemByIdQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting item with: {id} from database.", request.Id);

        var item = await _context.Items.SingleOrDefaultAsync(i => i.Id == request.Id);

        if(item is null)
        {
            _logger.LogWarning($"Category with Id {request.Id} not found.");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find {nameof(Item)} with id: {request.Id}." });
        }

        return new DetailedItemAdminDto
        (
            item.Id,
            item.Name,
            item.Base64Image,
            item.PolishName,
            item.Quantity,
            item.UnitPrice,
            item.CategoryId
        );
    }
}