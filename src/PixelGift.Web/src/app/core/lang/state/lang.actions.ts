import { createAction, props } from '@ngrx/store';
import { AvailableLangs } from '../available-langs.type';

export class LangActions {
  static setLang = createAction(
    '[Lang] setLang',
    props<{ lang: AvailableLangs }>()
  );
}
