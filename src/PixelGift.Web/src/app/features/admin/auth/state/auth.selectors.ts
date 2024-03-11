import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export class AuthSelectors {
  private static getAuthState = createFeatureSelector<AuthState>('auth');

  static selectUser = createSelector(
    this.getAuthState,
    (state: AuthState) => state.user,
  );

  static isLoggedIn = createSelector(
    this.getAuthState,
    (state: AuthState) => state.user !== null,
  );
}
