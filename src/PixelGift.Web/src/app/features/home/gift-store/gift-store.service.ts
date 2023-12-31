import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, combineLatest, map, switchMap, tap } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { TranslocoService } from '@ngneat/transloco';
import { Category, Item } from 'src/app/core/models';

@Injectable({ providedIn: 'root' })
export class GiftStoreService {
  private http = inject(HttpClient);

  private baseUrl = inject(API_URL);

  private categoriesCache: Category[] = [];

  private currentCategorySource = new Subject<Category>();

  private translocoService = inject(TranslocoService);

  currentCategoryChanged$ = this.currentCategorySource.asObservable();

  private itemsInputChanged$ = combineLatest([
    this.currentCategoryChanged$,
    this.translocoService.langChanges$,
  ]).pipe(map(([category, lang]) => ({ category, lang })));

  items$ = this.itemsInputChanged$.pipe(
    switchMap(({ category, lang }) => this.getItems(category.id, lang))
  );

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`).pipe(
      tap((categories) => {
        this.categoriesCache = categories;
        // TODO: remove later its league of legeneds
        this.currentCategorySource.next(categories[2]);
      })
    );
  }

  getItems(categoryId: string, lang: string): Observable<Item[]> {
    return this.http.get<Item[]>(
      `${this.baseUrl}/items/category/${categoryId}?lang=${lang}`
    );
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
}
