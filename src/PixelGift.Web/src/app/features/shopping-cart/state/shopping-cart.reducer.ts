import { createReducer, on } from '@ngrx/store';
import { ShoppingCartActions } from './shopping-cart.actions';
import { OrderPaymentIntent } from 'src/app/features/shopping-cart/models/order-payment-intent.interface';
import { OrderCreated } from 'src/app/features/shopping-cart/models/order-created.interface';
import { OrderPreview, OrderPreviewFormData } from '../models';

export interface ShoppingCartState {
  orderPreview: OrderPreview | null;
  orderPreviewFormData: OrderPreviewFormData;
  orderFormSucceeded: boolean;
  orderPaymentIntent: OrderPaymentIntent | null;
  orderCreated: OrderCreated | null;
}

export const initialState = {
  orderPreview: null,
  orderPreviewFormData: {},
  orderFormSucceeded: false,
  orderPaymentIntent: null,
  orderCreated: null,
} as ShoppingCartState;

export const shoppingCartReduer = createReducer(
  initialState,

  on(ShoppingCartActions.setOrderPreview, (state, { orderPreview }) => ({
    ...state,
    orderPreview,
  })),

  on(ShoppingCartActions.updateOrderPreviewData, (state, { data }) => ({
    ...state,
    orderPreviewFormData: data,
  })),

  on(ShoppingCartActions.setOrderFormFullfiled, (state) => ({
    ...state,
    orderFormSucceeded: true,
  })),

  on(
    ShoppingCartActions.setOrderPaymentIntent,
    (state, { orderPaymentIntent }) => ({
      ...state,
      orderPaymentIntent,
    }),
  ),

  on(ShoppingCartActions.setOrder, (state, { orderCreated }) => ({
    ...state,
    orderCreated,
  })),

  on(ShoppingCartActions.clear, () => ({
    ...initialState,
  })),
);
