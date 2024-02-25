import { createReducer, on } from '@ngrx/store';
import { LangActions } from './lang.actions';
import { AvailableLangs } from '../available-langs.type';

export interface LangState {
  current: AvailableLangs;
}

const initialState = {
  current: 'en',
} as LangState;

export const langReducer = createReducer(
  initialState,
  on(LangActions.setLang, (state, { lang }) => ({
    ...state,
    current: lang,
  }))
);
