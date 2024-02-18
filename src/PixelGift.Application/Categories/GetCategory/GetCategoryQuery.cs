using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.Categories.GetCategory;

public record GetCategoryQuery(Guid Id) : IQuery<DetailedCategoryDto>;
