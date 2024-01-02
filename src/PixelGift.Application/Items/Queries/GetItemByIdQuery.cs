using MediatR;
using PixelGift.Application.Items.Dtos;

namespace PixelGift.Application.Items.Queries;

public record GetItemByIdQuery(Guid Id) : IRequest<DetailedItemAdminDto>;