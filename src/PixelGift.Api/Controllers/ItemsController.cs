using Microsoft.AspNetCore.Mvc;
using PixelGift.Api.Attributes;
using PixelGift.Application.Items.Commands.CreateItem;
using PixelGift.Application.Items.Commands.UpdateItem;
using PixelGift.Application.Items.Commands.DeleteItem;
using PixelGift.Application.Items.Queries.GetItemById;
using PixelGift.Application.Items.Queries.GetItems;
using PixelGift.Application.Items.Queries.GetItemsByCategory;
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
