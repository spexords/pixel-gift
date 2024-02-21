using Microsoft.AspNetCore.Mvc;
using PixelGift.Api.Attributes;
using PixelGift.Application.PromoCodes.CreatePromoCode;
using PixelGift.Application.PromoCodes.DeletePromoCode;
using PixelGift.Application.PromoCodes.GetPromoCode;
using PixelGift.Application.PromoCodes.GetPromoCodes;
using PixelGift.Application.PromoCodes.UpdatePromoCode;
using PixelGift.Core.Entities.Identity;

namespace PixelGift.Api.Controllers;

[AuthorizeRole(UserRole.Admin)]
public class PromoCodesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetPromoCodes()
    {
        var promoCodes = await Mediator.Send(new GetPromoCodesQuery());

        return Ok(promoCodes);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePromoCode(CreatePromoCodeCommand command)
    {
        await Mediator.Send(command);

        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPromoCode(Guid id)
    {
        var promoCode = await Mediator.Send(new GetPromoCodeQuery(id));

        return Ok(promoCode);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePromoCode(Guid id)
    {
        await Mediator.Send(new DeletePromoCodeCommand(id));

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePromoCode(Guid id, UpdatePromoCodeCommand command)
    {
        command = command with { Id = id };

        await Mediator.Send(command);

        return Ok();
    }
}