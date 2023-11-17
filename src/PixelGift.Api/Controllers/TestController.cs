using Microsoft.AspNetCore.Mvc;

namespace PixelGift.Api.Controllers;

public class TestController : BaseApiController
{
    [HttpGet]
    public IActionResult Test()
    {
        return Ok("Test 1, 2, 3!");
    }
}
