import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

export class AdminSelectors {
  private static getAdminState = createFeatureSelector<AdminState>('admin');

  static selectCategories = createSelector(
    this.getAdminState,
    (state: AdminState) => state.categories,
  );

  static selectCategoriesAsOptions = createSelector(
    this.getAdminState,
    (state: AdminState) =>
      state.categories.map((category) => ({
        value: category.id,
        displayValue: category.name,
      })),
  );

  static selectCategory = createSelector(
    this.getAdminState,
    (state: AdminState) => state.category,
  );

  static selectItems = createSelector(
    this.getAdminState,
    (state: AdminState) => state.items,
  );

  static selectItem = createSelector(
    this.getAdminState,
    (state: AdminState) => state.item,
  );

  static selectPromoCodes = createSelector(
    this.getAdminState,
    (state: AdminState) => state.promoCodes,
  );

  static selectPromoCode = createSelector(
    this.getAdminState,
    (state: AdminState) => state.promoCode,
  );

  static selectOrders = createSelector(
    this.getAdminState,
    (state: AdminState) => state.orders,
  );

  static selectOrder = createSelector(
    this.getAdminState,
    (state: AdminState) => state.order,
  );

  static selectSearchParams = createSelector(
    this.getAdminState,
    (state: AdminState) => state.searchParams,
  );
}
