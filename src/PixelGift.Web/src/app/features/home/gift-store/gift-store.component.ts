import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoriesComponent } from './store-categories/store-categories.component';
import { StoreItemsComponent } from './store-items/store-items.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { GiftStoreService } from './gift-store.service';
import { combineLatest, map } from 'rxjs';
import { Category, Scrollable } from 'src/app/core/models';

@Component({
  selector: 'app-gift-store',
  standalone: true,
  imports: [
    CommonModule,
    StoreCategoriesComponent,
    StoreItemsComponent,
    TranslocoPipe,
  ],
  templateUrl: './gift-store.component.html',
  styleUrl: './gift-store.component.scss',
})
export class GiftStoreComponent implements Scrollable {
  private giftStoreService = inject(GiftStoreService);

  private categories$ = this.giftStoreService.getCategories();

  private currentCategory$ = this.giftStoreService.currentCategoryChanged$;

  categoriesData$ = combineLatest([
    this.categories$,
    this.currentCategory$,
  ]).pipe(
    map(([categories, currentCategory]) => ({
      categories,
      currentCategory,
    }))
  );

  items$ = this.giftStoreService.items$;

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollIntoView() {
    const element = this.scrollTarget.nativeElement.offsetTop;
    window.scroll({
      top: element,
      behavior: 'smooth',
    });
  }

  categorySelected(category: Category): void {
    this.giftStoreService.notifyCategoryChange(category);
  }

  addItemToShoppingCart(itemId: string): void {
    this.giftStoreService.addItemToShoppingCart(itemId);
  }
}
