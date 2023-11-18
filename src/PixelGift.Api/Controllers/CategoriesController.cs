﻿using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Categories.Commands;
using PixelGift.Application.Categories.Queries;

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
    public async Task<IActionResult> CreateCategory(CreateCategoryCommand command)
    {
        await Mediator.Send(command);

        return Ok();
    }
}
