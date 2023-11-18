using MediatR;
using PixelGift.Application.Items.Dtos;

namespace PixelGift.Application.Items.Queries;

public record GetItemsByCategoryQuery(Guid CategoryId): IRequest<IEnumerable<ItemDto>>;
