using PixelGift.Application.Abstractions.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Commands;

public record LoginCommand(string Username, string Password) : ICommand<UserDto>;
