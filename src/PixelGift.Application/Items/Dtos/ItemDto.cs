namespace PixelGift.Application.Items.Dtos;

public record ItemDto(Guid Id, string Name, string Base64Image, string PolishName, string Description, string PolishDescription, decimal UnitPrice);