import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { Category, Item } from './models';

@Injectable({ providedIn: 'root' })
export class GiftStoreService {
  private http = inject(HttpClient);

  private baseUrl = inject(API_URL);

  private selectedCategorySource = new Subject<Category>();

  selectedCategory$ = this.selectedCategorySource.asObservable();

  items$ = this.selectedCategory$.pipe(
    switchMap((category) => this.getItems(category.id))
  );

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/categories`)
      .pipe(
        tap((categories) => this.selectedCategorySource.next(categories[2])) // remove later its legaue of legeneds
      );
  }

  getItems(categoryId: string): Observable<Item[]> {
    return this.http.get<Item[]>(
      `${this.baseUrl}/items/category/${categoryId}`
    );
  }

  selectCategory(category: Category): void {
    this.selectedCategorySource.next(category);
  }
}
