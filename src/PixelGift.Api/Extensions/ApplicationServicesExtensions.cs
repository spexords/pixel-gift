using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PixelGift.Application.Categories.Queries;
using PixelGift.Core.Interfaces;
using PixelGift.Infrastructure.Data;
using PixelGift.Infrastructure.Security;
using System.Text;

namespace PixelGift.Api.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection @this, IConfiguration config)
    {
        @this.AddCors(options =>
        {
            options.AddPolicy("default", builder =>
            {
                builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
            });
        });
        
        ConfigureJwt(@this, config["JwtTokenKey"]!);

        @this.AddAuthentication();

        @this.AddDbContext<PixelGiftContext>(options => options.UseSqlServer(config.GetConnectionString("MSSQL")));

        @this.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(GetCategoriesQuery).Assembly));

        @this.AddScoped<IJwtGenerator, JwtGenerator>();
        @this.AddScoped<IUserService, UserService>();

        return @this;
    }

    private static void ConfigureJwt(IServiceCollection services, string token)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token));
        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(opt =>
        {
            opt.RequireHttpsMetadata = false;
            opt.SaveToken = true;
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        });
    }
}
