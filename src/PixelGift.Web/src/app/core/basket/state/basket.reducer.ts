import { createReducer, on } from '@ngrx/store';
import { BasketItems } from '../../models';
import { BasketActions } from './basket.actions';

const BASKET_KEY = 'basket';

function tryLoadBasketItemsFromLocalStorage(): BasketItems {
  let basketItems = {} as BasketItems;
  const basketItemsSerialized = window.localStorage.getItem(BASKET_KEY);
  if (basketItemsSerialized) {
    basketItems = JSON.parse(basketItemsSerialized) as BasketItems;
  }
  return basketItems;
}

export interface BasketState {
  items: BasketItems;
}

export const initialState = {
  items: tryLoadBasketItemsFromLocalStorage(),
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
  }),

  on(BasketActions.updateItemQuantity, (state, { itemId, quantity }) => {
    const updatedItems = { ...state.items };
    if (itemId in state.items) {
      if (quantity <= 0) {
        delete updatedItems[itemId];
      } else {
        updatedItems[itemId] = quantity;
      }
    }
    return {
      ...state,
      items: updatedItems,
    };
  })
);
