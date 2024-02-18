using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Abstractions.Commands;
using PixelGift.Core.Entities;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;
using System.Net;

namespace PixelGift.Application.Categories.CreateCategory;

public class CreateCategoryHandler : ICommandHandler<CreateCategoryCommand, Unit>
{
    private readonly PixelGiftContext _context;
    private readonly ILogger<CreateCategoryCommand> _logger;

    public CreateCategoryHandler(PixelGiftContext context, ILogger<CreateCategoryCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Unit> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Checking in the database if the {name} already exists", request.Name);

        var categoryExists = await _context.Categories
            .AnyAsync(c => c.Name.ToLower() == request.Name.ToLower(), cancellationToken);

        if (categoryExists)
        {
            throw new BaseApiException(HttpStatusCode.BadRequest, new { Message = $"Category: {request.Name} already exsists" });
        }

        _logger.LogInformation("Adding a new category to the database. Category Name: {CategoryName}", request.Name);

        var category = new Category
        {
            Id = request.Id,
            Name = request.Name,
        };

        _context.Categories.Add(category);

        foreach (var formField in request.FormFields)
        {
            var fieldType = Enum.Parse<FieldType>(formField.FieldType);

            _context.FormFields.Add(new FormField
            {
                Id = formField.Id,
                Name = formField.Name,
                CategoryId = category.Id,
                Category = category,
                Options = fieldType == FieldType.Select ? string.Join(',', formField.Options) : null,
                Type = fieldType
            });
        }

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(Category)} with id {request.Id} created successfully.");

        return Unit.Value;
    }
}
