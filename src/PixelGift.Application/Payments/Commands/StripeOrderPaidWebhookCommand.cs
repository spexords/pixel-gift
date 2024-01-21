using MediatR;

namespace PixelGift.Application.Payments.Commands;

public record StripeOrderPaidWebhookCommand(string Json, string SignatureHeader) : IRequest<Unit>;