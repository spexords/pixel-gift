﻿using MediatR;
using PixelGift.Application.Abstractions.Commands;

namespace PixelGift.Application.Orders.Commands;

public record SendMessageCommand(Guid? OrderId, string Subject, string Content) : ICommand<Unit>;