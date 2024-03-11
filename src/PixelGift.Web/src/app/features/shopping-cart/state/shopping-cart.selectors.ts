import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingCartState } from './shopping-cart.reducer';
import { OrderCreated } from 'src/app/features/shopping-cart/models/order-created.interface';
import { FormFieldData } from '../models';

export class ShoppingCartSelectors {
  private static getShoppingCartState =
    createFeatureSelector<ShoppingCartState>('shoppingCart');

  static selectOrderPreview = createSelector(
    this.getShoppingCartState,
    (state: ShoppingCartState) => state.orderPreview,
  );

  static selectCategoryFormFieldsData = createSelector(
    this.getShoppingCartState,
    (state: ShoppingCartState) => {
      const formFieldsData: Record<string, FormFieldData[]> = {};

      for (const categoryKey in state.orderPreviewFormData) {
        const categoryFormFieldsData: FormFieldData[] = [];

        for (const fieldKey in state.orderPreviewFormData[categoryKey]) {
          if (fieldKey !== 'promoCode') {
            categoryFormFieldsData.push({
              key: fieldKey,
              value: state.orderPreviewFormData[categoryKey][
                fieldKey
              ] as string,
            });
          }
        }

        formFieldsData[categoryKey] = categoryFormFieldsData;
      }

      return formFieldsData;
    },
  );

  static selectPromoCodes = createSelector(
    this.getShoppingCartState,
    (state: ShoppingCartState) => {
      const promoCodes: Record<string, string> = {};
      for (const key in state.orderPreviewFormData) {
        const promoCode = state.orderPreviewFormData[key].promoCode;
        promoCodes[key] = promoCode;
      }
      return promoCodes;
    },
  );

  static selectOrderFormSucceeded = createSelector(
    this.getShoppingCartState,
    (state: ShoppingCartState) => state.orderFormSucceeded,
  );

  static selectOrderPaymentIntent = createSelector(
    this.getShoppingCartState,
    (state: ShoppingCartState) => state.orderPaymentIntent,
  );

  static selectOrderPaymentIntentId = createSelector(
    this.getShoppingCartState,
    (state: ShoppingCartState) =>
      state.orderPaymentIntent?.paymentIntentId as string,
  );

  static selectOrderCreated = createSelector(
    this.getShoppingCartState,
    (state: ShoppingCartState) => state.orderCreated as OrderCreated,
  );
}
