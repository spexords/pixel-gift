using MediatR;

namespace PixelGift.Core.Messaging.Events;

public interface IIntegrationEventHandler<in TEvent> : 
    INotificationHandler<TEvent> where TEvent : IIntegrationEvent
{
}
