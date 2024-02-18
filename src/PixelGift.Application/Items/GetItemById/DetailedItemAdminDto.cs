namespace PixelGift.Application.Items.GetItemById;

public record DetailedItemAdminDto(Guid Id, string Name, string Base64Image, string PolishName, int Quantity, decimal UnitPrice, Guid CategoryId);