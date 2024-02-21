namespace PixelGift.Application.Categories.Queries.GetCategory;

public record FormFieldDto(Guid Id, string Name, string FieldType, IEnumerable<string> Options);
