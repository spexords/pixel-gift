namespace PixelGift.Application.Categories.Queries.GetCategory;

public record DetailedCategoryDto(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields);