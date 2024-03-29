﻿using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Dtos;
using PixelGift.Core.Exceptions;
using PixelGift.Core.Interfaces;
using System.Net;

namespace PixelGift.Application.Account.Commands.Login;

public class LoginHandler : ICommandHandler<LoginCommand, UserDto>
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
