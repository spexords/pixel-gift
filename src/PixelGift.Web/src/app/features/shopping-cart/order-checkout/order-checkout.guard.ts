import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

export const orderCheckoutGuard: CanActivateFn = (route, state) => {
  const shoppingCartService = inject(ShoppingCartService);
  const router = inject(Router);
  const canCheckout = shoppingCartService.canCheckout();

  if (!canCheckout) {
    router.navigate(['/', 'shopping-cart']);
  }

  return canCheckout;
};
