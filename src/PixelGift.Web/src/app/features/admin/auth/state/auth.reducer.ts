import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../models';

export interface AuthState {
  user: User | null;
}

const initialState = {
  user: null,
} as AuthState;

export const authReducer = createReducer(
  initialState,

  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),
);
