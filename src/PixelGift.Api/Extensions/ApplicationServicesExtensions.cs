using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PixelGift.Application.Categories.Queries;
using PixelGift.Infrastructure.Data;

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

        @this.AddDbContext<PixelGiftContext>(options => options.UseSqlServer(config.GetConnectionString("MSSQL")));

        @this.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(GetCategoriesQuery).Assembly));

        return @this;
    }
}
