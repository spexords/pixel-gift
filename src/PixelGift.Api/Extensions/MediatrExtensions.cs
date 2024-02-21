using MediatR;
using Microsoft.EntityFrameworkCore;
using PixelGift.Core.Entities;

namespace PixelGift.Api.Extensions;

public static class MediatrExtensions
{
    public static async Task DispatchDomainEventsAsync(this IMediator mediator, DbContext context, CancellationToken cancellationToken = default)
    {
        var domainEntities = context.ChangeTracker
            .Entries<BaseEntity>()
            .Where(x => x.Entity.DomainEvents != null && x.Entity.DomainEvents.Any());

        var domainEvents = domainEntities.
            SelectMany(x => x.Entity.DomainEvents).ToList();

        foreach (var domainEntity in domainEntities)
        {
            domainEntity.Entity.ClearDomainEvents();
        }

        foreach (var domainEvent in domainEvents)
        {
            await mediator.Publish(domainEvent, cancellationToken);
        }
    }
}
