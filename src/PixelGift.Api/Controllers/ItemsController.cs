using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Items.Queries;

namespace PixelGift.Api.Controllers;

public class ItemsController : BaseApiController
{
    [HttpGet("category/{id}")]
    public async Task<IActionResult> GetItemsByCategory(Guid id, [FromQuery] string lang)
    {
        var items = await Mediator.Send(new GetItemsByCategoryQuery(id, lang));

        return Ok(items);
    }
}