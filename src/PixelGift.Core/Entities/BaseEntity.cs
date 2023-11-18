namespace PixelGift.Core.Entities;

public abstract class BaseEntity
{
    public Guid Id { get; set; }

    public DateTime? CreatedAt { get; set; } = DateTime.Now;

    public DateTime? UpdatedAt { get; set; }
}
