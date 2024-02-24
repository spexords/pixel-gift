import { Action, ActionReducer } from '@ngrx/store';
import {
  HomeState,
  homeReducer,
} from 'src/app/features/home/data/home.reducer';

export interface AppState {
  home: HomeState;
}

export interface AppStore {
  home: ActionReducer<HomeState, Action>;
}

export const appStore: AppStore = {
  home: homeReducer,
};

export const appEffects = [];
