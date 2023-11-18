using MediatR;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Commands;

public record LoginCommand(string Username, string Password) : IRequest<UserDto>;
