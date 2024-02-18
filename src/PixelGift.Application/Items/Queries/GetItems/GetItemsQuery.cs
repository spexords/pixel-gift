using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.Items.Queries.GetItems;

public record GetItemsQuery() : IQuery<IEnumerable<ItemAdminDto>>;
