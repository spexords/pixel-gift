using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Dtos;
using PixelGift.Core.Interfaces;

namespace PixelGift.Application.Account.Commands.CurrentUser;

public class CurrentUserHandler : ICommandHandler<CurrentUserCommand, UserDto>
{
    private readonly IUserService _userService;

    public CurrentUserHandler(IUserService _userService)
    {
        this._userService = _userService;
    }

    public Task<UserDto> Handle(CurrentUserCommand request, CancellationToken cancellationToken)
    {
        return _userService.CurrentUserAsync();
    }
}