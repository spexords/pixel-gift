using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.Items.Queries.GetItemsByCategory;

public record GetItemsByCategoryQuery(Guid CategoryId, string Language) : IQuery<IEnumerable<ItemDto>>;
