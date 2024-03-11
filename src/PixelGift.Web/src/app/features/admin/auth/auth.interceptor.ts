import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  first,
  switchMap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { RouterSelectors } from 'src/app/core/router';
import { ADMIN_PATH } from 'src/app/app.routes';
import { AuthActions, AuthSelectors } from './state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(AuthSelectors.selectUser).pipe(
    withLatestFrom(store.select(RouterSelectors.selectUrl)),
    first(),
    switchMap(([user, url]) => {
      if (user && url.startsWith(ADMIN_PATH)) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user!.token}`,
          },
        });
      }

      return next(req).pipe(
        catchError((error) => {
          if (error.status === 401) {
            store.dispatch(AuthActions.logout());
          }
          return throwError(() => error);
        }),
      );
    }),
  );
};
