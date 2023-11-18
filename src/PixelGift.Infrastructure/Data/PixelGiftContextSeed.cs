using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.Identity;
using PixelGift.Core.Extensions;

namespace PixelGift.Infrastructure.Data;

public class PixelGiftContextSeed
{
    private const string Fortnite = "fortnite";
    private const string Valorant = "valorant";
    private const string LeagueOfLegends = "legaue of legends";
    private const string CounterStrike = "cs2";

    public static async Task SeedAsync(PixelGiftContext context, ILoggerFactory loggerFactory)
    {
        var logger = loggerFactory.CreateLogger<PixelGiftContextSeed>();

        try
        {
            await SeedUsers(context, logger);

            await SeedCategories(context, logger);

            await context.SaveChangesAsync();

        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
        }
    }

    private static async Task SeedUsers(PixelGiftContext context, ILogger<PixelGiftContextSeed> logger)
    {
        logger.LogInformation("Remove old Users seed");
        context.Users.RemoveRange(context.Users);

        var users = new[]
        {
            new User{ Username = "admin", Role = UserRole.Admin, HashedPassword = "Pa$$Word".ToSha256Hash() }
        };

        logger.LogInformation("Creating new Users seed");
        await context.Users.AddRangeAsync(users);
    }

    private static async Task SeedCategories(PixelGiftContext context, ILogger logger)
    {
        logger.LogInformation("Remove old Categories seed");
        context.Categories.RemoveRange(context.Categories);


        var categories = new[]
        {
                new Category { Name = Fortnite },
                new Category { Name = Valorant },
                new Category { Name = LeagueOfLegends },
                new Category { Name = CounterStrike },
            };

        logger.LogInformation("Creating new Categories seed");
        await context.Categories.AddRangeAsync(categories);

        var category = categories.First(c => c.Name == LeagueOfLegends);

        logger.LogInformation("Creating items seed for: {category}", category.Name);
        SeedItems(category);
    }

    private static void SeedItems(Category category)
    {
        var items = new[]
        {
                new Item
                {
                    Name = "Hextech Key",
                    PolishName = "Polish Hextech Key",
                    Description = "Unlock a chest with this key",
                    PolishDescription = "Polish Unlock a chest with this key",
                    Quantity = 10,
                    UnitPrice = 50.0m,
                },
                new Item
                {
                    Name = "Hextech Chest",
                    PolishName = "Polish Hextech Chest",
                    Description = "Contains a random loot",
                    PolishDescription = "Polish Contains a random loot",
                    Quantity = 5,
                    UnitPrice = 75.0m,
                },
                new Item
                {
                    Name = "Skin 1",
                    PolishName = "Polish Skin 1",
                    Description = "Awesome skin for your favorite champion",
                    PolishDescription = "Polish Awesome skin for your favorite champion",
                    Quantity = 20,
                    UnitPrice = 100.0m,
                },
                new Item
                {
                    Name = "Skin 2",
                    PolishName = "Polish Skin 2",
                    Description = "Another cool skin option",
                    PolishDescription = "Polish Another cool skin option",
                    Quantity = 15,
                    UnitPrice = 120.0m,
                },
                new Item
                {
                    Name = "Champion Shard",
                    PolishName = "Polish Champion Shard",
                    Description = "Shard to unlock a new champion",
                    PolishDescription = "Polish Shard to unlock a new champion",
                    Quantity = 8,
                    UnitPrice = 90.0m,
                },
                new Item
                {
                    Name = "Ward Skin",
                    PolishName = "Polish Ward Skin",
                    Description = "Customize your ward",
                    PolishDescription = "Polish Customize your ward",
                    Quantity = 25,
                    UnitPrice = 60.0m,
                },
                new Item
                {
                    Name = "Emote",
                    PolishName = "Polish Emote",
                    Description = "Express yourself with an emote",
                    PolishDescription = "Polish Express yourself with an emote",
                    Quantity = 12,
                    UnitPrice = 0.21m,
                },
                new Item
                {
                    Name = "Summoner Icon",
                    PolishName = "Polish Summoner Icon",
                    Description = "Personalize your summoner icon",
                    PolishDescription = "Polish Personalize your summoner icon",
                    Quantity = 18,
                    UnitPrice = 1.66m,
                }
            };

        foreach (var item in items)
        {
            category.Items.Add(item);
        }
    }
}

