using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PixelGift.Core.Configuration;
using PixelGift.Core.Interfaces;
using System.Net;
using System.Net.Mail;

namespace PixelGift.Infrastructure.Services;

public class MailService : IMailService
{
    private readonly SmtpConfiguration _smtpConfig;
    private readonly ILogger<MailService> _logger;

    public MailService(IOptions<SmtpConfiguration> smtpConfigurationOptions, ILogger<MailService> logger)
    {
        _smtpConfig = smtpConfigurationOptions.Value;
        _logger = logger;
    }

    public async Task<bool> SendEmailAsync(string to, string subject, string body, bool isHtml = false)
    {
        try
        {
            _logger.LogInformation("Trying to connect to SMTP server: {server}", _smtpConfig.SmtpServer);

            using var client = new SmtpClient(_smtpConfig.SmtpServer)
            {
                Port = _smtpConfig.SmtpPort,
                Credentials = new NetworkCredential(_smtpConfig.SmtpUsername, _smtpConfig.SmtpPassword),
                EnableSsl = _smtpConfig.EnableSSL,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpConfig.SmtpUsername),
                Subject = subject,
                Body = body,
                IsBodyHtml = isHtml,
            };

            mailMessage.To.Add(to);
            await client.SendMailAsync(mailMessage);

            _logger.LogInformation("Successfully sent email to: {to}", to);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email to: {to}. Exception details: {exceptionDetails}", to, ex.ToString());

            return false;
        }
    }
}
