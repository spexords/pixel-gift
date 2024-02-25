import { createReducer, on } from '@ngrx/store';
import { BasketItems } from '../../models';
import { BasketActions } from './basket.actions';

export interface BasketState {
  items: BasketItems;
}

export const initialState = {
  items: {},
} as BasketState;

export const basketReducer = createReducer(
  initialState,

  on(BasketActions.addItem, (state, { itemId }) => ({
    ...state,
    items: {
      ...state.items,
      [itemId]: (state.items[itemId] || 0) + 1,
    },
  })),

  on(BasketActions.removeItem, (state, { itemId }) => {
    const updatedItems = { ...state.items };
    if (updatedItems[itemId] && updatedItems[itemId] > 1) {
      updatedItems[itemId] -= 1;
    } else {
      delete updatedItems[itemId];
    }
    return {
      ...state,
      items: updatedItems,
    };
  })
);
