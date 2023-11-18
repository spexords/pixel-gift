using MediatR;
using PixelGift.Application.Categories.Dtos;

namespace PixelGift.Application.Categories.Queries;

public class GetCategoriesQuery : IRequest<IEnumerable<CategoryDto>>
{
}
