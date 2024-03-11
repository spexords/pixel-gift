import { createAction, props } from '@ngrx/store';
import { OrderCreated } from 'src/app/features/shopping-cart/models/order-created.interface';
import { OrderPaymentIntent } from 'src/app/features/shopping-cart/models/order-payment-intent.interface';
import { OrderPreview, OrderPreviewFormData } from '../models';

export class ShoppingCartActions {
  static getOrderPreview = createAction('[Shopping Cart] getOrderPreview');
  static setOrderPreview = createAction(
    '[Shopping Cart] setOrderPreview',
    props<{ orderPreview: OrderPreview }>(),
  );
  static updateOrderPreviewData = createAction(
    '[Shopping Cart] updateOrderPreviewData',
    props<{ data: OrderPreviewFormData }>(),
  );
  static setOrderFormFullfiled = createAction(
    '[Shopping Cart] setOrderFormFullfiled',
  );
  static promoCodeUpdated = createAction('[Shopping Cart] promoCodeUpdated');

  static getOrderPaymentIntent = createAction(
    '[Shopping Cart] getOrderPaymentIntent',
  );

  static setOrderPaymentIntent = createAction(
    '[Shopping Cart] setOrderPaymentIntent',
    props<{ orderPaymentIntent: OrderPaymentIntent }>(),
  );

  static createOrder = createAction(
    '[Shopping Cart] createOrder',
    props<{ email: string }>(),
  );

  static setOrder = createAction(
    '[Shopping Cart] setOrder',
    props<{ orderCreated: OrderCreated }>(),
  );

  static clear = createAction('[Shopping Cart] clear');
}
