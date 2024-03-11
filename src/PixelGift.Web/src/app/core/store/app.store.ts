import { Action, ActionReducer } from '@ngrx/store';
import { HomeEffects } from 'src/app/features/home/state';
import {
  HomeState,
  homeReducer,
} from 'src/app/features/home/state/home.reducer';
import { LangState, langReducer } from '../lang/state/lang.reducer';
import { BasketState, basketReducer } from '../basket/state';
import { BasketEffects } from '../basket/state/basket.effects';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterState } from '../router';
import {
  AuthEffects,
  AuthState,
  authReducer,
} from 'src/app/features/admin/auth/state';

export interface AppStore {
  home: ActionReducer<HomeState, Action>;
  lang: ActionReducer<LangState, Action>;
  basket: ActionReducer<BasketState, Action>;
  router: ActionReducer<RouterReducerState<RouterState>>;
  auth: ActionReducer<AuthState, Action>;
}

export const appStore: AppStore = {
  home: homeReducer,
  lang: langReducer,
  basket: basketReducer,
  router: routerReducer,
  auth: authReducer,
};

export const appEffects = [HomeEffects, BasketEffects, AuthEffects];
