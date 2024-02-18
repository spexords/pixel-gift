namespace PixelGift.Application.Categories.GetCategory;

public record FormFieldDto(Guid Id, string Name, string FieldType, IEnumerable<string> Options);
