using MediatR;

namespace PixelGift.Application.Categories.Commands
{
    public class CreateCategoryCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;
    }
}
