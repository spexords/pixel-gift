using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PixelGift.Api.Extensions;
using PixelGift.Api.Middlewares;
using PixelGift.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
var environment = builder.Environment;
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices(config, environment);

var app = builder.Build();

//Migrations & seeding
using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<PixelGiftContext>();
await context.Database.MigrateAsync();
var loggerFactory = scope.ServiceProvider.GetRequiredService<ILoggerFactory>();
await PixelGiftContextSeed.SeedAdminAsync(context, loggerFactory);

//if (app.Environment.IsDevelopment())
//{
//    await PixelGiftContextSeed.SeedDataAsync(context, loggerFactory);
//}

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("default");

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToController("Index", "Fallback");

app.MapControllers();

app.Run();
