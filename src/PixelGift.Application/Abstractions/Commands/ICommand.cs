using MediatR;

namespace PixelGift.Application.Abstractions.Commands;

public interface ICommand : IRequest
{
}

public interface ICommand<out TResult> : IRequest<TResult>
{
}