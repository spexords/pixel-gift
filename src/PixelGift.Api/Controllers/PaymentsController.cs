using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Payments.Commands.CreateOrderPaymentIntent;
using PixelGift.Application.Payments.Commands.StripeOrderPaidWebhook;

namespace PixelGift.Api.Controllers;

public class PaymentsController : BaseApiController
{
    [HttpPost("intent")]
    public async Task<IActionResult> CreateOrderIntent(CreateOrderPaymentIntentCommand command)
    {
        var orderIntent = await Mediator.Send(command);

        return Ok(orderIntent);
    }


    // stripe listen --forward-to https://localhost:5100/api/payments/webhook -e payment_intent.succeeded,payment_intent.payment_failed
    [HttpPost("webhook")]
    public async Task<IActionResult> StripeOrderPaidWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        await Mediator.Send(new StripeOrderPaidWebhookCommand(json, Request.Headers["Stripe-Signature"]!));

        return Ok();
    }
}
