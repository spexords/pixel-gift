using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.Categories.GetCategories;

public record GetCategoriesQuery : IQuery<IEnumerable<CategoryDto>>;
