using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PixelGift.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class PromoCodeDiscount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "PromoCodes",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "PromoCodes");
        }
    }
}
