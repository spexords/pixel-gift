namespace PixelGift.Core.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = default!;

    public ICollection<Item> Items { get; } = new List<Item>();

    public ICollection<FormField> FormFields { get; } = new List<FormField>();

    public ICollection<PromoCode> PromoCodes { get; } = new List<PromoCode>();
}

/*
 *{
 *id,
 *createdAt,
 *status,
 *basket: [
 *{
 *  promoCode:
 *  category:
 *  metaData: {
 *    
 *  },
 *  items: [
 *  
 *  ]
 *}
 *
 *
 */