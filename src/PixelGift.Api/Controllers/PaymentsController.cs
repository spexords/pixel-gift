using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Payments.Commands;
using Stripe;

namespace PixelGift.Api.Controllers;

public class PaymentsController : BaseApiController
{
    private readonly IConfiguration _config;

    public PaymentsController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("intent")]
    public async Task<IActionResult> CreateOrderIntent(CreateOrderPaymentIntentCommand command)
    {
        var orderIntent = await Mediator.Send(command);

        return Ok(orderIntent);
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        //TODO: MOVE TO IREQUEST HANDLER

        //var json = await new StreamReader(Request.Body).ReadToEndAsync();

        //var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _config["StripeSettings:WhSecret"]);

        //PaymentIntent intent;
        //Order order;

        //switch (stripeEvent.Type)
        //{
        //    case "payment_intent.succeeded":
        //        intent = (PaymentIntent)stripeEvent.Data.Object;
        //        _logger.LogInformation("Payment succeded: ", intent.Id);
        //        order = await _paymentService.UpdateOrderPaymentSucceded(intent.Id);
        //        _logger.LogInformation("Order updated to payment received: ", order.Id);
        //        break;
        //    case "payment_intent.payment_failed":
        //        intent = (PaymentIntent)stripeEvent.Data.Object;
        //        _logger.LogInformation("Payment failed: ", intent.Id);
        //        order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
        //        _logger.LogInformation("Order updated to payment failed: ", order.Id);
        //        break;
        //    default:
        //        break;
        //}

        return Ok();
    }
}
