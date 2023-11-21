using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PixelGift.Core.Entities;

namespace PixelGift.Infrastructure.Data.Config;

public class ItemConfiguration : IEntityTypeConfiguration<Item>
{
    public void Configure(EntityTypeBuilder<Item> builder)
    {
        builder.ToTable("Items");
        builder.Property(t => t.UnitPrice)
            .HasPrecision(18, 2);
    }
}
