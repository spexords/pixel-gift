namespace PixelGift.Application.Items.Dtos;

public record ItemDto(Guid Id, string Name, string PolishName, string Description, string PolishDescription, decimal UnitPrice);