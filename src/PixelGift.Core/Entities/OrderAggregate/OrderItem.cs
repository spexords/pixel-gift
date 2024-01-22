namespace PixelGift.Core.Entities.OrderAggregate;

public class OrderItem : BaseEntity
{
    public Guid ItemId { get; set; }

    public string ItemName { get; set; } = default!;

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }
}
