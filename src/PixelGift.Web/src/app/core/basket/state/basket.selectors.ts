import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BasketState } from './basket.reducer';
import { BasketItems } from '../../models';

export class BasketSelectors {
  private static getBasketState = createFeatureSelector<BasketState>('basket');

  static selectItems = createSelector(
    this.getBasketState,
    (state: BasketState) => state.items
  );

  static selectItemsCount = createSelector(
    this.selectItems,
    (items: BasketItems) =>
      Object.values(items).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0)
  );
}
