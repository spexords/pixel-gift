using PixelGift.Core.Entities.Identity;

namespace PixelGift.Core.Interfaces;

public interface IJwtGenerator
{
    string CreateToken(User user);
}
