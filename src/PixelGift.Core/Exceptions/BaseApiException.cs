using System.Net;

namespace PixelGift.Core.Exceptions;

public class BaseApiException : Exception
{
    public virtual HttpStatusCode Code { get; }
    public virtual object Errors { get; }

    public BaseApiException(HttpStatusCode code, object errors)
    {
        Code = code;
        Errors = errors;
    }
}