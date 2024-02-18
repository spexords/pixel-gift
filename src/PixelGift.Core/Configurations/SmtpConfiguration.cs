namespace PixelGift.Core.Configuration;

public class SmtpConfiguration
{
    public string SmtpServer { get; set; } = default!;
    public int SmtpPort { get; set; }
    public string SmtpUsername { get; set; } = default!;
    public string SmtpPassword { get; set; } = default!;
    public bool EnableSSL { get; set; }
}
