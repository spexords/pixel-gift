﻿using MediatR;

namespace PixelGift.Application.Items.Commands;

public record UpdateItemCommand(
    Guid Id,
    string? Name,
    string? PolishName,
    Guid? CategoryId,
    string? Base64Image,
    int? Quantity,
    decimal? UnitPrice
    ) : IRequest<Unit>;
