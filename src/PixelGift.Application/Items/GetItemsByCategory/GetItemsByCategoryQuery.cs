using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.Items.GetItemsByCategory;

public record GetItemsByCategoryQuery(Guid CategoryId, string Language) : IQuery<IEnumerable<ItemDto>>;
