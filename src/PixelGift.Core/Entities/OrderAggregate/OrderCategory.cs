namespace PixelGift.Core.Entities.OrderAggregate;

public class OrderCategory : BaseEntity
{
    public Guid CategoryId { get; set; }

    public string CategoryName { get; set; } = default!;

    public string? PromoCode { get; set; }

    public decimal Subtotal { get; set; } 

    public decimal Discount { get; set; }

    public decimal Total { get; set; }

    public string Metadata { get; set; } = default!;

    public IEnumerable<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
