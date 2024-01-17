using PixelGift.Core.Dtos;
using PixelGift.Core.Entities;

namespace PixelGift.Core.Interfaces;

public interface IPaymentService
{
    public Task<OrderPaymentIntent> CreateOrderPaymentIntent(
        IEnumerable<Item> items,
        Dictionary<Guid, int> basketItems,
        Dictionary<Guid, string> promoCodes,
        CancellationToken cancellationToken);
}