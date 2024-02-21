using PixelGift.Core.Messaging.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Commands.Login;

public record LoginCommand(string Username, string Password) : ICommand<UserDto>;
