﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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

        var categoryExists = await _context.Categories
            .AnyAsync(c => c.Name.ToLower() == request.Name.ToLower(), cancellationToken);

        if (categoryExists)
        {
            _logger.LogWarning("Attempted to create a category that already exists. Category Name: {CategoryName}", request.Name);

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
            _context.FormFields.Add(new FormField
            {
                Name = formField.Name,
                CategoryId = category.Id,
                Category = category,
                Options = formField.Options.Count() > 0 ? string.Join(',', formField.Options) : null,
                Type = Enum.Parse<FieldType>(formField.FieldType)
            });
        }

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(Category)} with id {request.Id} created successfully.");

        return Unit.Value;
    }
}
