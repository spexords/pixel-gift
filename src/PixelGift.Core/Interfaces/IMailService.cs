namespace PixelGift.Core.Interfaces;

public interface IMailService
{
    Task<bool> SendEmailAsync(string to, string subject, string body, bool isHtml = false);
}
