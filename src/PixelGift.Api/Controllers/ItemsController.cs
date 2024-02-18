using Microsoft.AspNetCore.Mvc;
using PixelGift.Api.Attributes;
using PixelGift.Application.Items.CreateItem;
using PixelGift.Application.Items.DeleteItem;
using PixelGift.Application.Items.GetItemById;
using PixelGift.Application.Items.GetItems;
using PixelGift.Application.Items.GetItemsByCategory;
using PixelGift.Application.Items.UpdateItem;
using PixelGift.Core.Entities.Identity;

namespace PixelGift.Api.Controllers;

public class ItemsController : BaseApiController
{
    [HttpGet]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> GetItems()
    {
        var items = await Mediator.Send(new GetItemsQuery());

        return Ok(items);
    }

    [HttpGet("{id}")]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> GetItemById(Guid id)
    {
        var item = await Mediator.Send(new GetItemByIdQuery(id));

        return Ok(item);
    }

    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetItemsByCategory(Guid categoryId, [FromQuery] string lang)
    {
        var items = await Mediator.Send(new GetItemsByCategoryQuery(categoryId, lang));

        return Ok(items);
    }

    [HttpPost("category/{categoryId}")]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> CreateItemForCategory(Guid categoryId, CreateItemCommand command)
    {
        command = command with { CategoryId = categoryId };
        await Mediator.Send(command);

        return Ok();
    }

    [HttpDelete("{id}")]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> DeleteItem(Guid id)
    {
        await Mediator.Send(new DeleteItemCommand(id));

        return Ok();
    }

    [HttpPut("{id}")]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> UpdateItem(Guid id, [FromBody] UpdateItemCommand command)
    {
        command = command with { Id = id };
        await Mediator.Send(command);

        return Ok();
    }
}
