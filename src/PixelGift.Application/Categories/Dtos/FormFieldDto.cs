namespace PixelGift.Application.Categories.Dtos;

public record FormFieldDto(Guid Id, string Name, string FieldType, IEnumerable<string> Options);
