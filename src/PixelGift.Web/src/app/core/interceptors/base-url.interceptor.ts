import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../tokens';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;

  if (!url.includes('assets')) {
    const baseUrl = inject(API_URL);
    req = req.clone({ url: `${baseUrl}/${url}` });
  }
  return next(req);
};
