using PixelGift.Core.Entities.OrderAggregate;

namespace PixelGift.Core.Entities;

public class Message : BaseEntity
{
    public string Subject { get; set; } = default!;

    public string Content { get; set; } = default!;

    public Guid OrderId { get; set; }

    public Order Order { get; set; } = default!;
}