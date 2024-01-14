﻿using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Orders.Commands;

namespace PixelGift.Api.Controllers;

public class OrdersController : BaseApiController
{
    [HttpPost("preview")]
    public async Task<IActionResult> GenerateOrderPreview(GenerateOrderPreviewCommand command)
    {
        var orderPreview = await Mediator.Send(command);

        return Ok(orderPreview);
    }
}
