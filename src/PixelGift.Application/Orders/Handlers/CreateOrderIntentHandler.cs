using MediatR;
using Microsoft.Extensions.Logging;
using PixelGift.Application.Orders.Commands;
using PixelGift.Application.Orders.Dtos;

namespace PixelGift.Application.Orders.Handlers;

public class CreateOrderIntentHandler : IRequestHandler<CreateOrderIntentCommand, OrderIntentDto>
{
    private readonly ILogger<CreateOrderIntentHandler> _logger;

    public CreateOrderIntentHandler(ILogger<CreateOrderIntentHandler> logger)
    {
        _logger = logger;
    }

    public Task<OrderIntentDto> Handle(CreateOrderIntentCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
