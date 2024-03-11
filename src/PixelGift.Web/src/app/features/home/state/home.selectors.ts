import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';
import { Category } from '../models';

export class HomeSelectors {
  private static getHomeState = createFeatureSelector<HomeState>('home');

  static selectItems = createSelector(
    this.getHomeState,
    (state: HomeState) => state.items
  );

  static selectCategories = createSelector(
    this.getHomeState,
    (state: HomeState) => state.categories
  );

  static selectCurrentCategory = createSelector(
    this.getHomeState,
    (state: HomeState) => state.currentCategory as Category
  );
}
