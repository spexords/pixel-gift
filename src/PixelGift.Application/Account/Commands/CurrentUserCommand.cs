using PixelGift.Application.Abstractions.Commands;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Commands;

public record CurrentUserCommand() : ICommand<UserDto>;