using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Account.Commands;

namespace PixelGift.Api.Controllers;

public class AccountController : BaseApiController
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var user = await Mediator.Send(command);

        return Ok(user);
    }
}
