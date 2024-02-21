using MediatR;
using PixelGift.Core.Messaging.Commands;

namespace PixelGift.Application.Payments.Commands.StripeOrderPaidWebhook;

public record StripeOrderPaidWebhookCommand(string Json, string SignatureHeader) : ICommand<Unit>;