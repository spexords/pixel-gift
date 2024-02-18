using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Payments.Commands;

public record StripeOrderPaidWebhookCommand(string Json, string SignatureHeader) : ICommand<Unit>;