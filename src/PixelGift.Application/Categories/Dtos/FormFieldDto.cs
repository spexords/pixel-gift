namespace PixelGift.Application.Categories.Dtos;

public record FormFieldDto(string Name, string FieldType, IEnumerable<string> Options);
