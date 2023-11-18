using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Items.Queries;

namespace PixelGift.Api.Controllers;

public class ItemsController : BaseApiController
{
    [HttpGet("category/{id}")]
    public async Task<IActionResult> GetItemsByCategory(Guid id)
    {
        var items = await Mediator.Send(new GetItemsByCategoryQuery(id));

        return Ok(items);
    }
}