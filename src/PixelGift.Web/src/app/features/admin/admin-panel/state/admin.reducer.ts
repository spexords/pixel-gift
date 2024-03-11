import { createReducer, on } from '@ngrx/store';

import { AdminActions } from './admin.actions';
import { DetailedCategory, DetailedItemAdmin, DetailedOrderAdmin, DetailedPromoCode, ItemAdmin, OrderAdmin, OrderSearchParams, PromoCode } from '../models';
import { Category } from 'src/app/features/home/models';

export interface AdminState {
  categories: Category[];
  category: DetailedCategory | null;
  items: ItemAdmin[];
  item: DetailedItemAdmin | null;
  promoCodes: PromoCode[];
  promoCode: DetailedPromoCode | null;
  orders: OrderAdmin[];
  order: DetailedOrderAdmin | null;
  searchParams: OrderSearchParams | null;
}

const initialState = {
  categories: [],
  category: null,
  items: [],
  item: null,
  promoCodes: [],
  promoCode: null,
  orders: [],
  order: null,
  searchParams: null,
} as AdminState;

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.setCategories, (state, { categories }) => ({
    ...state,
    categories,
  })),
  on(AdminActions.setCategory, (state, { category }) => ({
    ...state,
    category,
  })),
  on(AdminActions.setItems, (state, { items }) => ({
    ...state,
    items,
  })),
  on(AdminActions.setItem, (state, { item }) => ({
    ...state,
    item,
  })),
  on(AdminActions.setPromoCodes, (state, { promoCodes }) => ({
    ...state,
    promoCodes,
  })),
  on(AdminActions.setPromoCode, (state, { promoCode }) => ({
    ...state,
    promoCode,
  })),
  on(AdminActions.setOrders, (state, { orders }) => ({
    ...state,
    orders,
  })),
  on(AdminActions.setOrder, (state, { order }) => ({
    ...state,
    order,
  })),
  on(AdminActions.setSearchParams, (state, { searchParams }) => ({
    ...state,
    searchParams,
  })),
);
