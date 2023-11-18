using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Dtos;
using PixelGift.Core.Extensions;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Infrastructure.Security;

public class UserService : IUserService
{
    private readonly PixelGiftContext _context;
    private readonly IJwtGenerator _jwtGenerator;
    private readonly ILogger<UserService> _logger;

    public UserService(PixelGiftContext context, IJwtGenerator jwtGenerator, ILogger<UserService> logger)
    {
        _context = context;
        _jwtGenerator = jwtGenerator;
        _logger = logger;
    }

    public async Task<UserDto?> AuthenticateAsync(string username, string password)
    {
        _logger.LogInformation("Attempting to authenticate user: {Username}", username);

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if(user is null)
        {
            _logger.LogWarning("User not found for authentication: {Username}", username);
            return null;
        }

        if(!ValidatePassword(user.HashedPassword, password.ToSha256Hash()))
        {
            _logger.LogWarning("Invalid password for user: {Username}", username);
            return null;
        }

        _logger.LogInformation("User successfully authenticated: {Username}", username);

        return new UserDto 
        { 
            Username = user.Username, 
            Role = user.Role.ToString(), 
            Token = _jwtGenerator.CreateToken(user) 
        };
    }

    private bool ValidatePassword(string actual, string provided)
    {
        return string.Equals(actual, provided, StringComparison.Ordinal);
    }
}