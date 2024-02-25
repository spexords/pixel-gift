import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeActions } from './home.actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';
import { GiftStoreService } from '../gift-store/gift-store.service';
import { HomeSelectors } from './home.selectors';
import { Store } from '@ngrx/store';
import { LangActions, LangSelectors } from 'src/app/core/lang/state';

@Injectable()
export class HomeEffects {
  private store = inject(Store);
  private actions = inject(Actions);
  private giftStoreService = inject(GiftStoreService);

  loadCategories = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.getCategoriesList),
      switchMap(() =>
        this.giftStoreService
          .getCategories()
          .pipe(
            map((categories) => HomeActions.setCategoriesList({ categories }))
          )
      )
    )
  );

  refreshItems = createEffect(() =>
    this.actions.pipe(
      ofType(LangActions.setLang, HomeActions.chooseCategoryByName),
      withLatestFrom(this.store.select(HomeSelectors.selectCurrentCategory)),
      filter(([, category]) => category !== null),
      map(() => HomeActions.getItemsList())
    )
  );

  setDefaultCategory = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.setCategoriesList),
      withLatestFrom(this.store.select(HomeSelectors.selectCurrentCategory)),
      filter(([, category]) => category === null),
      map(([action]) =>
        HomeActions.chooseCategoryByName({ name: action.categories[0].name })
      )
    )
  );

  loadItems = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.getItemsList),
      withLatestFrom(
        this.store.select(HomeSelectors.selectCurrentCategory),
        this.store.select(LangSelectors.selectLang)
      ),
      filter(([, category]) => category !== null),
      switchMap(([, category, lang]) =>
        this.giftStoreService
          .getItems(category!.id, lang)
          .pipe(map((items) => HomeActions.setItemsList({ items })))
      )
    )
  );
}
