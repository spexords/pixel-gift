import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, first, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const isLoggedId = authService.isLoggedIn();

  if (isLoggedId) {
    authService.user$.pipe(first()).subscribe((user) => {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
