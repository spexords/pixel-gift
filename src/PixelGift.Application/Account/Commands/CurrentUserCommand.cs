using MediatR;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Account.Commands;

public record CurrentUserCommand() : IRequest<UserDto>;