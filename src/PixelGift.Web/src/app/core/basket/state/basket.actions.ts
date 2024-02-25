import { createAction, props } from '@ngrx/store';

export class BasketActions {
  static addItem = createAction(
    '[Basket] addItem',
    props<{ itemId: string }>()
  );

  static removeItem = createAction(
    '[Basket] removeItem',
    props<{ itemId: string }>()
  );
}
