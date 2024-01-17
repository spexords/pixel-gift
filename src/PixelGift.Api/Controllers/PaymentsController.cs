using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Payments.Commands;

namespace PixelGift.Api.Controllers;

public class PaymentsController : BaseApiController
{
    [HttpPost("intent")]
    public async Task<IActionResult> CreateOrderIntent(CreateOrderPaymentIntentCommand command)
    {
        var orderIntent = await Mediator.Send(command);

        return Ok(orderIntent);
    }
}
