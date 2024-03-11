import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthSelectors } from './state';
import { tap } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(AuthSelectors.isLoggedIn).pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/admin/auth']);
      }
    }),
  );
};