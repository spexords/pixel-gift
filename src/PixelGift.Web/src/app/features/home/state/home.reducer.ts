import { createReducer, on } from '@ngrx/store';
import { HomeActions } from './home.actions';
import { Item, Category } from '../models';

export interface HomeState {
  items: Item[];
  categories: Category[];
  currentCategory: Category | null;
}

const initialState = {
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
