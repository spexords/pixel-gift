namespace PixelGift.Application.Categories.Dtos;

public record DetailedCategoryDto(Guid Id, string Name, IEnumerable<FormFieldDto> FormFields);