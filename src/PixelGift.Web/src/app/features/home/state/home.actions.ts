import { createAction, props } from '@ngrx/store';
import { Category, Item } from 'src/app/core/models';

export class HomeActions {
  static getItemsList = createAction('[Home] getItemsList');
  static setItemsList = createAction(
    '[Home] setItemsList',
    props<{ items: Item[] }>()
  );
  static getCategoriesList = createAction('[Home] getCategoriesList');
  static setCategoriesList = createAction(
    '[Home] setCategoriesList',
    props<{ categories: Category[] }>()
  );
  static chooseCategoryByName = createAction(
    '[Home] chooseCategoryByName',
    props<{ name: string }>()
  );
}
