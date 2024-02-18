using PixelGift.Application.Categories.GetCategory;
using PixelGift.Core.Dtos;

namespace PixelGift.Application.Orders.GenerateOrderPreview;

public record OrderItemDto(Guid Id, string Name, int Quantity, decimal UnitPrice, decimal Total, string base64Image);

public record OrderCategoryDto(Guid Id, string Name, IEnumerable<OrderItemDto> Items, IEnumerable<FormFieldDto> FormFields);

public record OrderPreviewDto(IEnumerable<OrderCategoryDto> OrderCategories, OrderSummary OrderSummary);
