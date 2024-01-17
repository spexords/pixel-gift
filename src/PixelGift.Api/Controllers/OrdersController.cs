using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Orders.Commands;
using PixelGift.Core.Entities;

namespace PixelGift.Api.Controllers;

public class OrdersController : BaseApiController
{
    [HttpPost("preview")]
    public async Task<IActionResult> GenerateOrderPreview(GenerateOrderPreviewCommand command)
    {
        var orderPreview = await Mediator.Send(command);

        return Ok(orderPreview);
    }

    [HttpPost("intent")]
    public async Task<IActionResult> CreateOrderIntent(CreateOrderIntentCommand command)
    {
        var orderIntent = await Mediator.Send(command);

        return Ok(orderIntent);
    }
}
