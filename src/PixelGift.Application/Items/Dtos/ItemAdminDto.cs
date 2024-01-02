namespace PixelGift.Application.Items.Dtos;

public record ItemAdminDto(Guid Id, string Name, string PolishName, string Base64Image, int Quantity, string Category);
