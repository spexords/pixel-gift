﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PixelGift.Infrastructure.Data;

#nullable disable

namespace PixelGift.Infrastructure.Data.Migrations
{
    [DbContext(typeof(PixelGiftContext))]
    [Migration("20240104100743_PromoCodeDiscount")]
    partial class PromoCodeDiscount
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("PixelGift.Core.Entities.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("PixelGift.Core.Entities.FormField", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Options")
                        .HasColumnType("longtext");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("FormFields");
                });

            modelBuilder.Entity("PixelGift.Core.Entities.Identity.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("HashedPassword")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PixelGift.Core.Entities.Item", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Base64Image")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PolishName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("PixelGift.Core.Entities.PromoCode", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("Expiry")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("PromoCodes");
                });

            modelBuilder.Entity("PixelGift.Core.Entities.FormField", b =>
                {
                    b.HasOne("PixelGift.Core.Entities.Category", "Category")
                        .WithMany("FormFields")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("PixelGift.Core.Entities.Item", b =>
                {
                    b.HasOne("PixelGift.Core.Entities.Category", "Category")
                        .WithMany("Items")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("PixelGift.Core.Entities.Category", b =>
                {
                    b.Navigation("FormFields");

                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}