using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Commands.CurrentUser;

public record CurrentUserCommand() : ICommand<UserDto>;