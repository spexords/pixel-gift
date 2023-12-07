using MediatR;
using PixelGift.Application.Categories.Dtos;

namespace PixelGift.Application.Categories.Queries;

public record GetCategoryQuery(Guid Id) : IRequest<DetailedCategoryDto>;
