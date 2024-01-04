namespace PixelGift.Core.Entities;

public class FormField : BaseEntity
{
    public string Name { get; set; } = default!;

    public FieldType Type { get; set; }

    public string? Options { get; set; } = default!;

    public Guid CategoryId { get; set; }

    public Category Category { get; set; } = null!;
}
