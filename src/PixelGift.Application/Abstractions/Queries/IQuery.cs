﻿using MediatR;

namespace PixelGift.Application.Abstractions.Queries;

public interface IQuery<out TResult> : IRequest<TResult>
{
}
