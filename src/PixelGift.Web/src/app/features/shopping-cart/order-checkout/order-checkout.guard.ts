import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SHOPPING_CART_PATH } from 'src/app/app.routes';
import { Store } from '@ngrx/store';
import { ShoppingCartSelectors } from '../state';
import { tap } from 'rxjs';

export const orderCheckoutGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(ShoppingCartSelectors.selectOrderFormSucceeded).pipe(
    tap((formSucceded) => {
      if (!formSucceded) {
        router.navigate([SHOPPING_CART_PATH]);
      }
    }),
  );
};
