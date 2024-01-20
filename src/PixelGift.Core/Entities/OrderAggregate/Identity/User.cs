namespace PixelGift.Core.Entities.OrderAggregate.Identity;

public class User : BaseEntity
{
    public string Username { get; set; } = default!;

    public string HashedPassword { get; set; } = default!;

    public UserRole Role { get; set; }
}
