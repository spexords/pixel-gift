using PixelGift.Application.Abstractions.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.CurrentUser;

public record CurrentUserCommand() : ICommand<UserDto>;