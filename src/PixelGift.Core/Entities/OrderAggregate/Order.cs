namespace PixelGift.Core.Entities.OrderAggregate;

public class Order : BaseEntity
{
    public int CustomerOrderId { get; set; }

    public string Email { get; set; } = default!;

    public OrderStatus Status { get; set; }

    public IEnumerable<OrderCategory> OrderCategories { get; set; } = new List<OrderCategory>();

    public string PaymentIntentId { get; set; } = default!;

    public decimal Subtotal => OrderCategories.Sum(c => c.Subtotal);

    public decimal Discount => OrderCategories.Sum(c => c.Discount);

    public decimal Total => OrderCategories.Sum(c => c.Total);
}