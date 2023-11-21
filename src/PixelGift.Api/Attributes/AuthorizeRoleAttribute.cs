using Microsoft.AspNetCore.Authorization;
using PixelGift.Core.Entities.Identity;

namespace PixelGift.Api.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
public class AuthorizeRoleAttribute : AuthorizeAttribute
{
    public AuthorizeRoleAttribute(UserRole role) : base()
    {
        Roles = role.ToString();
    }
}
