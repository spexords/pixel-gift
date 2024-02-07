using MediatR;
using Microsoft.EntityFrameworkCore;
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
        var category = await _context.Categories
            .Include(c => c.FormFields)
            .SingleOrDefaultAsync(c => c.Id == request.Id);

        if (category is null)
        {
            _logger.LogWarning($"Could not find {nameof(Category)} with id: {request.Id}");
            throw new BaseApiException(HttpStatusCode.NotFound, new { Message = $"Could not find ${nameof(Category)} with id: {request.Id}." });
        }

        category.Name = request.Name ?? category.Name;

        UpdateFormFields(category, request);

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation($"{nameof(Category)} with id {request.Id} updated successfully.");

        return Unit.Value;
    }

    private void UpdateFormFields(Category category, UpdateCategoryCommand request)
    {
        HandleDeleteFormFields(category, request);

        HandleUpdateFormFields(category, request);

        HandleAddFormFields(category, request);
    }

    private void HandleDeleteFormFields(Category category, UpdateCategoryCommand request)
    {
        var currentFormFields = category.FormFields;
        var requestFormFields = request.FormFields;

        var formFieldIdsToRemove = currentFormFields.Select(cff => cff.Id).Except(requestFormFields.Select(nff => nff.Id));

        _logger.LogInformation($"Removing {formFieldIdsToRemove.Count()} {nameof(FormField)} in {nameof(Category)}: {category.Name}.");

        var formFieldsToRemove = category.FormFields
          .Where(cff => formFieldIdsToRemove.Contains(cff.Id));

        _context.FormFields.RemoveRange(formFieldsToRemove);
    }

    private void HandleUpdateFormFields(Category category, UpdateCategoryCommand request)
    {
        var currentFormFields = category.FormFields;
        var requestFormFields = request.FormFields;

        var formFieldIdsToUpdate = currentFormFields
            .Select(cff => cff.Id)
            .Intersect(requestFormFields.Select(rff => rff.Id));

        _logger.LogInformation($"Updating {formFieldIdsToUpdate.Count()} {nameof(FormField)} in {nameof(Category)}: {category.Name}.");

        foreach (var formFieldId in formFieldIdsToUpdate)
        {
            var currentFormField = currentFormFields.FirstOrDefault(cff => cff.Id == formFieldId);
            var requestFormField = requestFormFields.FirstOrDefault(rff => rff.Id == formFieldId);

            if (currentFormField != null && requestFormField != null)
            {
                currentFormField.Name = requestFormField.Name ?? currentFormField.Name;

                if (!string.IsNullOrEmpty(requestFormField.FieldType))
                {
                    var fieldType = Enum.Parse<FieldType>(requestFormField.FieldType);

                    currentFormField.Type = fieldType;

                    currentFormField.Options = fieldType == FieldType.Select ? string.Join(',', requestFormField.Options) : null;
                }
            }
        }
    }

    private void HandleAddFormFields(Category category, UpdateCategoryCommand request)
    {
        var currentFormFields = category.FormFields;
        var requestFormFields = request.FormFields;

        var formFieldIdsToAdd = requestFormFields
            .Select(rff => rff.Id)
            .Except(currentFormFields.Select(cff => cff.Id));

        _logger.LogInformation($"Adding {formFieldIdsToAdd.Count()} new {nameof(FormField)} to {nameof(Category)}: {category.Name}.");

        foreach (var formFieldIdToAdd in formFieldIdsToAdd)
        {
            var requestFormField = requestFormFields.FirstOrDefault(rff => rff.Id == formFieldIdToAdd);

            if (requestFormField != null)
            {
                var fieldType = Enum.Parse<FieldType>(requestFormField.FieldType);

                var newFormField = new FormField
                {
                    Id = requestFormField.Id,
                    CategoryId = category.Id,
                    Name = requestFormField.Name,
                    Options = fieldType == FieldType.Select ? string.Join(',', requestFormField.Options) : null,
                    Type = fieldType
                };

                _context.FormFields.Add(newFormField);
            }
        }
    }
}