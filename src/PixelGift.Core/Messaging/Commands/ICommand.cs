using MediatR;

namespace PixelGift.Core.Messaging.Commands;

public interface ICommand : IRequest
{
}

public interface ICommand<out TResult> : IRequest<TResult>
{
}