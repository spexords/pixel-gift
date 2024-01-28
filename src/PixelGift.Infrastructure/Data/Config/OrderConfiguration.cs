using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PixelGift.Core.Entities;
using PixelGift.Core.Entities.OrderAggregate;

namespace PixelGift.Infrastructure.Data.Config;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");
        builder.Property(o => o.CustomerOrderId).ValueGeneratedOnAdd();
        builder
           .HasMany<Message>(o => o.Messages)
           .WithOne(i => i.Order)
           .HasForeignKey(i => i.OrderId)
           .OnDelete(DeleteBehavior.Cascade);
    }
}
