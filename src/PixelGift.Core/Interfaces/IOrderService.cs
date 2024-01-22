using PixelGift.Core.Dtos;
using PixelGift.Core.Entities;

namespace PixelGift.Core.Interfaces;

public interface IOrderService
{
    public Task<OrderSummary> GetOrderSummary(
        IEnumerable<Item> items,
        Dictionary<Guid, int> basketItems,
        Dictionary<Guid, string> promoCodes,
        CancellationToken cancellationToken);

    public Task<IEnumerable<PromoCode>> GetValidPromoCodes(Dictionary<Guid, string> promoCodes, CancellationToken cancellationToken);
}
