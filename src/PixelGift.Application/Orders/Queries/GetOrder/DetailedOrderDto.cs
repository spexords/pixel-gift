using PixelGift.Application.Orders.Commands.CreateOrder;

namespace PixelGift.Application.Orders.Queries.GetOrder;

public record DetailedOrderDto(
    Guid Id,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    int CustomerOrderId,
    string Email,
    string Status,
    string PaymentIntentId,
    IEnumerable<DetailedOrderCategoryDto> Categories,
    IEnumerable<MailMessageDto> Messages,
    decimal Subtotal,
    decimal Discount,
    decimal Total);

public record MailMessageDto(
    string Subject,
    DateTime CreatedAt,
    string Content);

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

