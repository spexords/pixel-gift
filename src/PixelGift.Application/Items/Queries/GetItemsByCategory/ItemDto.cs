namespace PixelGift.Application.Items.Queries.GetItemsByCategory;

public record ItemDto(Guid Id, string Name, string Base64Image, decimal UnitPrice);
