import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export class AuthActions {
  static login = createAction(
    '[Auth] login',
    props<{ username: string; password: string }>(),
  );

  static setUser = createAction(
    '[Admin] setUser',
    props<{ user: User | null }>(),
  );

  static logout = createAction('[Admin] logout');

  static getCurrentUser = createAction('[Admin] getCurrentUser');
}
