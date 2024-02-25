import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LangState } from './lang.reducer';

export class LangSelectors {
  static getLangState = createFeatureSelector<LangState>('lang');

  static selectLang = createSelector(
    this.getLangState,
    (state: LangState) => state.current
  );
}
