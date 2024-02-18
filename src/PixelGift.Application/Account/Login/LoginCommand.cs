using PixelGift.Application.Abstractions.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Login;

public record LoginCommand(string Username, string Password) : ICommand<UserDto>;
