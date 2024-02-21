using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.Categories.Queries.GetCategories;

public record GetCategoriesQuery : IQuery<IEnumerable<CategoryDto>>;
