using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PixelGift.Core.Entities;

namespace PixelGift.Infrastructure.Data.Config;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");
        builder.HasMany<Item>(c => c.Items)
            .WithOne(i => i.Category)
            .HasForeignKey(i => i.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany<FormField>(c => c.FormFields)
            .WithOne(f => f.Category)
            .HasForeignKey(f => f.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany<PromoCode>(c => c.PromoCodes)
            .WithOne(p => p.Category)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
