using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PixelGift.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class FormFieldsNullableOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Options",
                table: "FormFields",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "FormFields",
                keyColumn: "Options",
                keyValue: null,
                column: "Options",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Options",
                table: "FormFields",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
