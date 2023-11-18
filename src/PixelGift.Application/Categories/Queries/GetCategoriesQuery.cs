using MediatR;
using PixelGift.Application.Categories.Dtos;

namespace PixelGift.Application.Categories.Queries;

public record GetCategoriesQuery : IRequest<IEnumerable<CategoryDto>>;
