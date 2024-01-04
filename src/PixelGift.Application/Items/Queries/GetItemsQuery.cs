using MediatR;
using PixelGift.Application.Items.Dtos;

namespace PixelGift.Application.Items.Queries;

public record GetItemsQuery() : IRequest<IEnumerable<ItemAdminDto>>;
