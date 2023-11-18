using PixelGift.Core.Dtos;
using PixelGift.Core.Entities.Identity;

namespace PixelGift.Core.Interfaces;

public interface IUserService
{
    Task<UserDto?> AuthenticateAsync(string username, string password);
}