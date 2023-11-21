namespace PixelGift.Core.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = default!;

    public ICollection<Item> Items { get; } = new List<Item>();
}
