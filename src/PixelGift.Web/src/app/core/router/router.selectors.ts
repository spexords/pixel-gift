import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterState } from './router-serializer';
import { RouterReducerState } from '@ngrx/router-store';

export class RouterSelectors {
  private static getRouterState =
    createFeatureSelector<RouterReducerState<RouterState>>('router');

  static selectUrl = createSelector(this.getRouterState, (state) => {
    return state?.state.url?.substring(1);
  });
}
