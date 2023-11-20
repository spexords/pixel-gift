using Microsoft.AspNetCore.Mvc;
using PixelGift.Api.Attributes;
using PixelGift.Application.Categories.Commands;
using PixelGift.Application.Categories.Queries;
using PixelGift.Core.Entities.Identity;

namespace PixelGift.Api.Controllers;

public class CategoriesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await Mediator.Send(new GetCategoriesQuery());

        return Ok(categories);
    }

    [HttpPost]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> CreateCategory(CreateCategoryCommand command)
    {
        await Mediator.Send(command);

        return Ok();
    }

    [HttpDelete("{id}")]
    [AuthorizeRole(UserRole.Admin)]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        await Mediator.Send(new DeleteCategoryCommand(id));

        return Ok();
    }

}
