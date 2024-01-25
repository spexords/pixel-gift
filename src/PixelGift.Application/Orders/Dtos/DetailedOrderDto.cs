namespace PixelGift.Application.Orders.Dtos;

public record DetailedOrderDto(
    Guid Id, 
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    int CustomerOrderId, 
    string Email, 
    string Status, 
    string PaymentIntentId,
    IEnumerable<DetailedOrderCategoryDto> Categories,
    decimal Subtotal,
    decimal Discount,
    decimal Total);

public record DetailedOrderCategoryDto(
    string Name,
    string? PromoCode,
    decimal Subtotal,
    decimal Discount,
    decimal Total,
    IEnumerable<FormFieldDataDto> Metadata,
    IEnumerable<DetailedOrderItemDto> Items);


public record DetailedOrderItemDto(
    string Name,
    int Quantity,
    decimal UnitPrice);

