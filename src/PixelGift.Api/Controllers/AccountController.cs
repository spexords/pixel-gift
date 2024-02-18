using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PixelGift.Application.Account.ChangePassword;
using PixelGift.Application.Account.CurrentUser;
using PixelGift.Application.Account.Login;

namespace PixelGift.Api.Controllers;

public class AccountController : BaseApiController
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var user = await Mediator.Send(command);

        return Ok(user);
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordCommand command)
    {
        await Mediator.Send(command);

        return Ok();
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetCurrentUser()
    {
        var user = await Mediator.Send(new CurrentUserCommand());

        return Ok(user);
    }
}
