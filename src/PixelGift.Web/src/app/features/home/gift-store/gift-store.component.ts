import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoriesComponent } from './store-categories/store-categories.component';
import { StoreItemsComponent } from './store-items/store-items.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { GiftStoreService } from './gift-store.service';
import { combineLatest, map } from 'rxjs';
import { Category, Scrollable } from 'src/app/core/models';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { HomeActions, HomeSelectors } from '../state';

@Component({
  selector: 'app-gift-store',
  standalone: true,
  imports: [
    CommonModule,
    StoreCategoriesComponent,
    StoreItemsComponent,
    TranslocoPipe,
    LetDirective,
  ],
  templateUrl: './gift-store.component.html',
  styleUrl: './gift-store.component.scss',
})
export class GiftStoreComponent implements Scrollable {
  private giftStoreService = inject(GiftStoreService);
  private store = inject(Store);

  categories$ = this.store.select(HomeSelectors.selectCategories);

  currentCategory$ = this.store.select(HomeSelectors.selectCurrentCategory);

  items$ = this.store.select(HomeSelectors.selectItems);

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollIntoView() {
    const element = this.scrollTarget.nativeElement.offsetTop;
    window.scroll({
      top: element,
      behavior: 'smooth',
    });
  }

  categorySelected(category: Category): void {
    this.store.dispatch(
      HomeActions.chooseCategoryByName({ name: category.name })
    );
  }

  addItemToShoppingCart(itemId: string): void {
    this.giftStoreService.addItemToShoppingCart(itemId);
  }
}
