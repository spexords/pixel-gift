import { Action, ActionReducer } from '@ngrx/store';
import { HomeEffects } from 'src/app/features/home/state';
import {
  HomeState,
  homeReducer,
} from 'src/app/features/home/state/home.reducer';
import { LangState, langReducer } from '../lang/state/lang.reducer';
import { BasketState, basketReducer } from '../basket/state';

export interface AppState {
  home: HomeState;
  lang: LangState;
  basket: BasketState;
}

export interface AppStore {
  home: ActionReducer<HomeState, Action>;
  lang: ActionReducer<LangState, Action>;
  basket: ActionReducer<BasketState, Action>;
}

export const appStore: AppStore = {
  home: homeReducer,
  lang: langReducer,
  basket: basketReducer,
};

export const appEffects = [HomeEffects];
