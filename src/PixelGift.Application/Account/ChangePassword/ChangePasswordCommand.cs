using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Account.ChangePassword;

public record ChangePasswordCommand(string OldPassword, string NewPassword) : ICommand<Unit>;