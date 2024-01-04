namespace PixelGift.Core.Entities;

public class PromoCode : BaseEntity
{
    public string Code { get; set; } = default!;

    public decimal Discount { get; set; }

    public DateTime Expiry { get; set; }

    public Guid CategoryId { get; set; }

    public Category Category { get; set; } = null!;
}