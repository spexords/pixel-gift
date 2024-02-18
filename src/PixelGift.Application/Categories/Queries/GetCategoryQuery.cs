using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Categories.Dtos;

namespace PixelGift.Application.Categories.Queries;

public record GetCategoryQuery(Guid Id) : IQuery<DetailedCategoryDto>;
