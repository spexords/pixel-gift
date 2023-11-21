namespace PixelGift.Core.Entities;

public class PromoCode : BaseEntity
{
    public string Code { get; set; } = default!;

    public DateTime Expiry { get; set; }
}