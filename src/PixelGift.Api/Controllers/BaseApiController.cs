using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PixelGift.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseApiController : ControllerBase
{
    private IMediator? _mediator;
    protected IMediator Mediator => _mediator ?? (_mediator = (IMediator)HttpContext.RequestServices.GetRequiredService<IMediator>());
}
