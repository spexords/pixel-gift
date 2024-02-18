using PixelGift.Application.Abstractions.Queries;
using PixelGift.Application.Items.Dtos;

namespace PixelGift.Application.Items.Queries;

public record GetItemByIdQuery(Guid Id) : IQuery<DetailedItemAdminDto>;