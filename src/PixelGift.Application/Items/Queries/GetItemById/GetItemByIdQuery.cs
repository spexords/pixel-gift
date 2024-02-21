using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.Items.Queries.GetItemById;

public record GetItemByIdQuery(Guid Id) : IQuery<DetailedItemAdminDto>;