using MediatR;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Commands;

public class LoginCommand : IRequest<UserDto>
{
    public string Username { get; set; } = default!;

    public string Password { get; set; } = default!;
}
