using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Account.Commands.ChangePassword;

public record ChangePasswordCommand(string OldPassword, string NewPassword) : ICommand<Unit>;