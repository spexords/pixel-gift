using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Dtos;
using PixelGift.Core.Exceptions;
using PixelGift.Core.Extensions;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;
using System.Net;
using System.Security.Claims;

namespace PixelGift.Infrastructure.Security;

public class UserService : IUserService
{
    private readonly PixelGiftContext _context;
    private readonly IJwtGenerator _jwtGenerator;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UserService> _logger;

    public UserService(
        PixelGiftContext context, 
        IJwtGenerator jwtGenerator, 
        IHttpContextAccessor httpContextAccessor, 
        ILogger<UserService> logger)
    {
        _context = context;
        _jwtGenerator = jwtGenerator;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<UserDto?> AuthenticateAsync(string username, string password, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Attempting to authenticate user: {Username}", username);

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username, cancellationToken);

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

        return new UserDto(user.Username, user.Role.ToString(), _jwtGenerator.CreateToken(user)); 
    }

    public async Task ChangePasswordAsync(string oldPassword, string newPassword)
    {
        var user = _httpContextAccessor.HttpContext.User;

        var username = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        var userEntity = await _context.Users.FirstAsync(u => u.Username == username);

        if (!ValidatePassword(userEntity.HashedPassword, oldPassword.ToSha256Hash()))
        {
            _logger.LogWarning("ChangePassword failed for user {Username}. Invalid credentials.", username);
            throw new BaseApiException(HttpStatusCode.Unauthorized, new { Message = "Invalid credentials" });
        }

        userEntity.HashedPassword = newPassword.ToSha256Hash();

        await _context.SaveChangesAsync();
        _logger.LogInformation("Password changed successfully for user {Username}.", username);
    }

    private bool ValidatePassword(string actual, string provided)
    {
        return string.Equals(actual, provided, StringComparison.Ordinal);
    }
}