using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PixelGift.Core.Entities.Identity;
using PixelGift.Core.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PixelGift.Infrastructure.Security;

public class JwtGenerator : IJwtGenerator
{
    private SymmetricSecurityKey key;
    public JwtGenerator(IConfiguration config)
    {
        key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtTokenKey"]!));
    }

    public string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
