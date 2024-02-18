using Microsoft.AspNetCore.Mvc;
using PixelGift.Api.Attributes;
using PixelGift.Application.Orders.Commands.CreateOrder;
using PixelGift.Application.Orders.Commands.GenerateOrderPreview;
using PixelGift.Application.Orders.Commands.SendMessage;
using PixelGift.Application.Orders.Commands.UpdateOrder;
using PixelGift.Application.Orders.Queries.GetOrder;
using PixelGift.Application.Orders.Queries.GetOrders;
using PixelGift.Core.Entities.Identity;

namespace PixelGift.Api.Controllers;

public class OrdersController : BaseApiController
{
    [HttpPost("preview")]
    public async Task<IActionResult> GenerateOrderPreview(GenerateOrderPreviewCommand command)
    {
        var orderPreview = await Mediator.Send(command);

        return Ok(orderPreview);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderCommand command)
    {
        var order = await Mediator.Send(command);

        return Ok(order);
    }

    [AuthorizeRole(UserRole.Admin)]
    [HttpGet]
    public async Task<IActionResult> GetOrders([FromQuery] string? status, [FromQuery] int? customerOrderId)
    {
        var orders = await Mediator.Send(new GetOrdersQuery(status, customerOrderId));

        return Ok(orders);
    }

    [AuthorizeRole(UserRole.Admin)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(Guid id)
    {
        var order = await Mediator.Send(new GetOrderQuery(id));

        return Ok(order);
    }

    [AuthorizeRole(UserRole.Admin)]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(Guid id, UpdateOrderCommand command)
    {
        command = command with { Id = id };
        await Mediator.Send(command);

        return Ok();
    }

    [AuthorizeRole(UserRole.Admin)]
    [HttpPost("{id}/send-message")]
    public async Task<IActionResult> SendMessage(Guid id, [FromBody] SendMessageCommand command)
    {
        command = command with { OrderId = id };
        await Mediator.Send(command);

        return Ok();
    }
}
