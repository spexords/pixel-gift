import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { Category, Item } from './models';

@Injectable({ providedIn: 'root' })
export class GiftStoreService {
  private http = inject(HttpClient);

  private baseUrl = inject(API_URL);

  private categoriesCache: Category[] = [];

  private currentCategorySource = new Subject<Category>();

  currentCategory = this.currentCategorySource.asObservable();

  items$ = this.currentCategory.pipe(
    switchMap((category) => this.getItems(category.id))
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

  getItems(categoryId: string): Observable<Item[]> {
    return this.http.get<Item[]>(
      `${this.baseUrl}/items/category/${categoryId}`
    );
  }

  selectCategory(category: Category): void {
    this.currentCategorySource.next(category);
  }

  selectCategoryByName(categoryName: string): void {
    const category = this.categoriesCache.find((c) => c.name === categoryName);
    if(category) {
      this.selectCategory(category);
    }
  }
}
