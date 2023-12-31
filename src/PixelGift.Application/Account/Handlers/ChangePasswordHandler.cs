﻿using MediatR;
using PixelGift.Application.Account.Commands;
using PixelGift.Core.Interfaces;

namespace PixelGift.Application.Account.Handlers;

public class ChangePasswordHandler : IRequestHandler<ChangePasswordCommand, Unit>
{
    private readonly IUserService _userService;

    public ChangePasswordHandler(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        await _userService.ChangePasswordAsync(request.OldPassword, request.NewPassword);

        return Unit.Value;
    }
}