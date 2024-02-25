import { createReducer, on } from '@ngrx/store';
import { Category, Item } from 'src/app/core/models';
import { HomeActions } from './home.actions';

export interface HomeState {
  items: Item[];
  categories: Category[];
  currentCategory: Category | null;
}

export const initialState = {
  items: [],
  categories: [],
  currentCategory: null,
} as HomeState;

export const homeReducer = createReducer(
  initialState,

  on(HomeActions.setItemsList, (state, { items }) => ({
    ...state,
    items,
  })),

  on(HomeActions.setCategoriesList, (state, { categories }) => ({
    ...state,
    categories,
  })),

  on(HomeActions.chooseCategoryByName, (state, { name }) => ({
    ...state,
    currentCategory: state.categories.find((c) => c.name === name) as Category,
  }))
);
