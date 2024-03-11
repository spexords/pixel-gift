import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ShoppingCartActions } from './shopping-cart.actions';
import {
  Observable,
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { LangActions, LangSelectors } from 'src/app/core/lang/state';
import { ShoppingCartSelectors } from './shopping-cart.selectors';
import { BasketSelectors } from 'src/app/core/basket/state/basket.selectors';
import { BasketActions } from 'src/app/core/basket/state';
import { RouterSelectors } from 'src/app/core/router';
import { SHOPPING_CART_PATH } from 'src/app/app.routes';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ShoppingCartClearService } from '../shopping-cart-clear.service';

@Injectable()
export class ShoppingCartEffects {
  private store = inject(Store);
  private router = inject(Router);
  private translocoService = inject(TranslocoService);
  private actions = inject(Actions);
  private shoppingCartService = inject(ShoppingCartService);
  private shoppingCartClearService = inject(ShoppingCartClearService);

  refreshOrderPreview = createEffect(() =>
    this.actions.pipe(
      ofType(
        ShoppingCartActions.promoCodeUpdated,
        LangActions.setLang,
        BasketActions.addItem,
        BasketActions.removeItem,
        BasketActions.updateItemQuantity,
      ),
      withLatestFrom(this.store.select(RouterSelectors.selectUrl)),
      filter(([, url]) => url === SHOPPING_CART_PATH),
      map(() => ShoppingCartActions.getOrderPreview()),
    ),
  );

  loadOrderPreview = createEffect(() =>
    this.actions.pipe(
      ofType(ShoppingCartActions.getOrderPreview),
      withLatestFrom(
        this.store.select(BasketSelectors.selectItems),
        this.store.select(ShoppingCartSelectors.selectPromoCodes),
        this.store.select(LangSelectors.selectLang),
      ),
      switchMap(([, basketItems, promoCodes]) =>
        this.shoppingCartService
          .getOrderPreview(basketItems, promoCodes)
          .pipe(
            map((orderPreview) =>
              ShoppingCartActions.setOrderPreview({ orderPreview }),
            ),
          ),
      ),
    ),
  );

  createOrderPaymentIntent = createEffect(() =>
    this.actions.pipe(
      ofType(ShoppingCartActions.getOrderPaymentIntent),
      withLatestFrom(
        this.store.select(BasketSelectors.selectItems),
        this.store.select(ShoppingCartSelectors.selectPromoCodes),
      ),
      switchMap(([, basketItems, promoCodes]) =>
        this.shoppingCartService
          .createOrderPaymentIntent(basketItems, promoCodes)
          .pipe(
            map((orderPaymentIntent) =>
              ShoppingCartActions.setOrderPaymentIntent({ orderPaymentIntent }),
            ),
          ),
      ),
    ),
  );

  createOrder = createEffect(() =>
    this.actions.pipe(
      ofType(ShoppingCartActions.createOrder),
      withLatestFrom(
        this.store.select(BasketSelectors.selectItems),
        this.store.select(ShoppingCartSelectors.selectPromoCodes),
        this.store.select(ShoppingCartSelectors.selectCategoryFormFieldsData),
        this.store.select(ShoppingCartSelectors.selectOrderPaymentIntentId),
      ),
      switchMap(
        ([{ email }, items, promoCodes, categoryFormFieldsData, intentId]) =>
          this.shoppingCartService
            .createOrder(
              items,
              promoCodes,
              categoryFormFieldsData,
              intentId,
              email,
            )
            .pipe(
              map((orderCreated) =>
                ShoppingCartActions.setOrder({ orderCreated }),
              ),
              catchError((error) => this.handleOrderCreateError(error)),
            ),
      ),
    ),
  );

  private handleOrderCreateError(error: HttpErrorResponse): Observable<never> {
    const code = error.status;
    const message: string = error.error.errors.message;
    if (
      code == 400 &&
      (message.includes('Could not find') ||
        message.includes("Invalid requested item's quantity") ||
        message.includes('Could not create order'))
    ) {
      alert(
        this.translocoService.getActiveLang() === 'en'
          ? 'Invalid request - clearing basket. Please complete your shopping cart again.'
          : 'Nieprawidłowe żądanie - czyszczenie koszyka. Proszę wypełnić koszyk ponownie.',
      );
      this.router.navigate(['/']);
      this.shoppingCartClearService.clear();
    }
    return throwError(() => error);
  }
}
