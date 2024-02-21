using MediatR;

namespace PixelGift.Core.Messaging.Queries;

public interface IQueryHandler<in TQuery, TResult> 
    : IRequestHandler<TQuery, TResult> where TQuery : IQuery<TResult>
{
}
