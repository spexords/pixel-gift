import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BasketActions } from './basket.actions';
import { tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { BasketSelectors } from './basket.selectors';
import { BASKET_KEY } from './basket.reducer';

@Injectable()
export class BasketEffects {
  private store = inject(Store);
  private actions = inject(Actions);

  updateBasketLocalStorage = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          BasketActions.addItem,
          BasketActions.removeItem,
          BasketActions.updateItemQuantity,
          BasketActions.clear
        ),
        withLatestFrom(this.store.select(BasketSelectors.selectItems)),
        tap(([, basketItems]) => {
          const basketItemsSerialized = JSON.stringify(basketItems);
          window.localStorage.setItem(BASKET_KEY, basketItemsSerialized);
        })
      ),
    { dispatch: false }
  );
}
