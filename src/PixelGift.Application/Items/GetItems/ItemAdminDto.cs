namespace PixelGift.Application.Items.GetItems;

public record ItemAdminDto(Guid Id, string Name, string PolishName, string Base64Image, int Quantity, string Category);
