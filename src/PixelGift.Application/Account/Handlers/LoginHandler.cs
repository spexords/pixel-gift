using MediatR;
using PixelGift.Application.Account.Commands;
using PixelGift.Core.Dtos;
using PixelGift.Core.Exceptions;
using PixelGift.Core.Interfaces;
using System.Net;

namespace PixelGift.Application.Account.Handlers;

public class LoginHandler : IRequestHandler<LoginCommand, UserDto>
{
    private readonly IUserService _userService;

    public LoginHandler(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<UserDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userService.AuthenticateAsync(request.Username, request.Password, cancellationToken);

        if (user is null)
        {
            throw new BaseApiException(HttpStatusCode.Unauthorized, new { Message = $"Invalid credentials" });
        }

        return user;
    }
}
