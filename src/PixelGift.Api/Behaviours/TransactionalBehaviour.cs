using MediatR;
using PixelGift.Api.Extensions;
using PixelGift.Core.Exceptions;
using PixelGift.Infrastructure.Data;

namespace PixelGift.Api.Behaviours;

public class TransactionalBehaviour<TRequest, TResponse> : 
    IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<TransactionalBehaviour<TRequest, TResponse>> _logger;

    public TransactionalBehaviour(IServiceScopeFactory serviceScopeFactory, ILogger<TransactionalBehaviour<TRequest, TResponse>> logger)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        using var scope = _serviceScopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<PixelGiftContext>();
        var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

        try
        {
            var response = await next();

            await mediator.DispatchDomainEventsAsync(context, cancellationToken);

            await context.SaveChangesAsync();

            return response;
        }
        catch (Exception ex)
        {
            if(ex is not BaseApiException)
            {
                _logger.LogError(ex, "An error occurred during transactional request processing.");
            }

            throw;
        }
    }
}
