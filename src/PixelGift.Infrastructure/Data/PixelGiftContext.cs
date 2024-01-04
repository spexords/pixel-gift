using Microsoft.EntityFrameworkCore;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.Identity;

namespace PixelGift.Infrastructure.Data;

public class PixelGiftContext : DbContext
{
    public DbSet<Category> Categories { get; set; }

    public DbSet<Item> Items { get; set; }

    public DbSet<PromoCode> PromoCodes { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<FormField> FormFields { get; set; }

    public PixelGiftContext(DbContextOptions options) : base(options)
    {
    }
}
