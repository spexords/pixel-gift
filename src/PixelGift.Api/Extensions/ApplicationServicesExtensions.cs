namespace PixelGift.Api.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection @this, IConfiguration config)
    {
        @this.AddCors(options =>
        {
            options.AddPolicy("default", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
            });
        });

        return @this;
    }
}
