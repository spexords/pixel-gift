using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Account.Commands;

public record ChangePasswordCommand(string OldPassword, string NewPassword) : ICommand<Unit>;