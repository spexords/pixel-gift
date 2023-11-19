using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Items.Commands;
using PixelGift.Application.Items.Queries;

namespace PixelGift.Api.Controllers;

public class ItemsController : BaseApiController
{
    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetItemsByCategory(Guid categoryId, [FromQuery] string lang)
    {
        var items = await Mediator.Send(new GetItemsByCategoryQuery(categoryId, lang));

        return Ok(items);
    }

    [HttpPost("category/{categoryId}")]
    public async Task<IActionResult> CreateItemForCategory(Guid categoryId, CreateItemCommand command )
    {
        command = command with { CategoryId = categoryId };
        await Mediator.Send(command);

        return Ok();
    }
}