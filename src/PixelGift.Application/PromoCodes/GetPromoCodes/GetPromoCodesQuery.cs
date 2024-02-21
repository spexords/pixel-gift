using PixelGift.Core.Messaging.Queries;

namespace PixelGift.Application.PromoCodes.GetPromoCodes;

public record GetPromoCodesQuery() : IQuery<IEnumerable<PromoCodeDto>>;
