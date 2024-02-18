using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.Categories.Queries.GetCategory;

public record GetCategoryQuery(Guid Id) : IQuery<DetailedCategoryDto>;
