import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import {
  Observable,
  catchError,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private authService = inject(AuthService);

  login = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map((user) => AuthActions.setUser({ user })),
          catchError((error) => this.handleLoginError(error)),
        ),
      ),
    ),
  );

  logout = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.logout),
      map(() => AuthActions.setUser({user: null})),
    ),
  );

  getCurrentUser = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.getCurrentUser),
      switchMap(() =>
        this.authService
          .getCurrentUser()
          .pipe(map((user) => AuthActions.setUser({ user }))),
      ),
    ),
  );

  updateToken = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.setUser),
        map(({ user }) =>
          user ? this.saveJwtToken(user.token) : this.deleteJwtToken(),
        ),
      ),
    { dispatch: false },
  );

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      const { message } = error.error.errors;
      alert(message);
    }
    return throwError(() => error);
  }

  private deleteJwtToken(): void {
    window.localStorage.removeItem('jwt');
  }

  private saveJwtToken(token: string): void {
    window.localStorage.setItem('jwt', token);
  }
}
