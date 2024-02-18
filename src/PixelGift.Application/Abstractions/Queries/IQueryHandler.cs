using MediatR;

namespace PixelGift.Application.Abstractions.Queries;

public interface IQueryHandler<in TQuery, TResult> 
    : IRequestHandler<TQuery, TResult> where TQuery : IQuery<TResult>
{
}
