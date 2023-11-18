using PixelGift.Core.Exceptions;
using System.Net.Mime;
using System.Net;

namespace PixelGift.Api.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            await HandleExceptionAsync(ex, httpContext);
        }
    }

    private async Task HandleExceptionAsync(Exception ex, HttpContext httpContext)
    {
        object errors = default!;
        switch (ex)
        {
            case BaseApiException ae:
                errors = ae.Errors;
                httpContext.Response.StatusCode = (int)ae.Code;
                break;
            case Exception e:
                errors = string.IsNullOrWhiteSpace(e.Message) ? "Server error" : e.Message;
                httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                break;
        }
        httpContext.Response.ContentType = MediaTypeNames.Application.Json;
        await httpContext.Response.WriteAsJsonAsync(new { errors });
    }
}
