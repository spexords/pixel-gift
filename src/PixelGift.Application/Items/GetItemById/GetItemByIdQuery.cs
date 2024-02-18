using PixelGift.Application.Abstractions.Queries;

namespace PixelGift.Application.Items.GetItemById;

public record GetItemByIdQuery(Guid Id) : IQuery<DetailedItemAdminDto>;