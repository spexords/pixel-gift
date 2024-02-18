namespace PixelGift.Application.Categories.GetCategory;

public record DetailedCategoryDto(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields);