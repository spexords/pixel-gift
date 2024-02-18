using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Items.Dtos;

namespace PixelGift.Application.Items.Queries;

public record GetItemsByCategoryQuery(Guid CategoryId, string Language): IQuery<IEnumerable<ItemDto>>;
