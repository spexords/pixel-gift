using PixelGift.Core.Entities.OrderAggregate.Identity;

namespace PixelGift.Core.Interfaces;

public interface IJwtGenerator
{
    string CreateToken(User user);
}
