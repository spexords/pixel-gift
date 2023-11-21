using MediatR;

namespace PixelGift.Application.Account.Commands;

public record ChangePasswordCommand(string OldPassword, string NewPassword) : IRequest<Unit>;