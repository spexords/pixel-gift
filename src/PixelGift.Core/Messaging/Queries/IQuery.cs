using MediatR;

namespace PixelGift.Core.Messaging.Queries;

public interface IQuery<out TResult> : IRequest<TResult>
{
}
