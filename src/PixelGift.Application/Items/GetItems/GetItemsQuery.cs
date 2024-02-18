using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.Items.GetItems;

public record GetItemsQuery() : IQuery<IEnumerable<ItemAdminDto>>;
