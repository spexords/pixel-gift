import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShoppingCartActions } from './state';
import { BasketActions } from 'src/app/core/basket/state';

@Injectable()
export class ShoppingCartClearService {
  private store = inject(Store);

  clear(): void {
    this.store.dispatch(ShoppingCartActions.clear());
    this.store.dispatch(BasketActions.clear());
  }
}
