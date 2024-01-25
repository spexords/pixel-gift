using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PixelGift.Core.Entities.OrderAggregate;

namespace PixelGift.Infrastructure.Data.Config;

public class OrderCategoryConfiguration : IEntityTypeConfiguration<OrderCategory>
{
    public void Configure(EntityTypeBuilder<OrderCategory> builder)
    {
        builder.ToTable("OrderCategories");
    }
}
