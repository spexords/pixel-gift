﻿namespace PixelGift.Core.Entities;

public class Item : BaseEntity
{
    public string Name { get; set; } = default!;

    public string Base64Image { get; set; } = default!;

    public string PolishName { get; set; } = default!;

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public Guid CategoryId { get; set; }

    public Category Category { get; set; } = null!;
}
