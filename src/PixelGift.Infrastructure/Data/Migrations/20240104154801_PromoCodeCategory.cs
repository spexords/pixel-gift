using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PixelGift.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class PromoCodeCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "PromoCodes",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_PromoCodes_CategoryId",
                table: "PromoCodes",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_PromoCodes_Categories_CategoryId",
                table: "PromoCodes",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PromoCodes_Categories_CategoryId",
                table: "PromoCodes");

            migrationBuilder.DropIndex(
                name: "IX_PromoCodes_CategoryId",
                table: "PromoCodes");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "PromoCodes");
        }
    }
}
