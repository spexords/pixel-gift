import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, combineLatest, map, switchMap, tap } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { Category, Item } from 'src/app/core/models';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

@Injectable({ providedIn: 'root' })
export class GiftStoreService {
  private http = inject(HttpClient);
  private categoriesCache: Category[] = [];
  private currentCategorySource = new Subject<Category>();
  private translocoService = inject(TranslocoService);
  private shoppingCartService = inject(ShoppingCartService);

  currentCategoryChanged$ = this.currentCategorySource.asObservable();

  private itemsInputChanged$ = combineLatest([
    this.currentCategoryChanged$,
    this.translocoService.langChanges$,
  ]).pipe(map(([category, lang]) => ({ category, lang })));

  items$ = this.itemsInputChanged$.pipe(
    switchMap(({ category, lang }) => this.getItems(category.id, lang))
  );

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('categories').pipe(
      tap((categories) => {
        this.categoriesCache = categories;
        this.currentCategorySource.next(categories[0]);
      })
    );
  }

  getItems(categoryId: string, lang: string): Observable<Item[]> {
    return this.http.get<Item[]>(`items/category/${categoryId}?lang=${lang}`);
  }

  notifyCategoryChange(category: Category): void {
    this.currentCategorySource.next(category);
  }

  selectCategoryByName(categoryName: string): void {
    const category = this.categoriesCache.find((c) => c.name === categoryName);
    if (category) {
      this.notifyCategoryChange(category);
    }
  }

  addItemToShoppingCart(itemId: string): void {
    this.shoppingCartService.addItem(itemId);
  }
}
