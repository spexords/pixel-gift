import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  map,
  switchMap,
  tap,
} from 'rxjs';
import {
  Category,
  CategoryPayloadRequest,
  DetailedCategory,
  ItemAdmin,
  ItemPayloadRequest,
  User,
} from 'src/app/core/models';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({ providedIn: 'root' })
export class AdminPanelService {
  private userSource = new ReplaySubject<User | null>();
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  private categoriesChangedSource = new BehaviorSubject<unknown>(undefined);
  private categoriesChanged$ = this.categoriesChangedSource.asObservable();

  private itemsChangedSource = new BehaviorSubject<unknown>(undefined);
  private itemsChanged$ = this.itemsChangedSource.asObservable();

  user$ = this.userSource.asObservable();

  items$ = this.itemsChanged$.pipe(switchMap(() => this.getItems()));

  categories$ = this.categoriesChanged$.pipe(
    switchMap(() => this.getCategories())
  );

  categoriesAsSelectOptions$ = this.categories$.pipe(
    map((categories) =>
      categories.map((category) => ({
        value: category.id,
        displayValue: category.name,
      }))
    )
  );

  getCategory(id: string): Observable<DetailedCategory> {
    return this.http.get<DetailedCategory>(`${this.baseUrl}/categories/${id}`);
  }

  deleteCategory(id: string): Observable<unknown> {
    return this.http
      .delete(`${this.baseUrl}/categories/${id}`)
      .pipe(tap(() => this.categoriesChangedSource.next(undefined)));
  }

  createCategory(values: CategoryPayloadRequest): Observable<unknown> {
    return this.http
      .post(`${this.baseUrl}/categories`, values)
      .pipe(tap(() => this.categoriesChangedSource.next(undefined)));
  }

  updateCategory(
    id: string,
    values: CategoryPayloadRequest
  ): Observable<unknown> {
    return this.http
      .put(`${this.baseUrl}/categories/${id}`, values)
      .pipe(tap(() => this.categoriesChangedSource.next(undefined)));
  }

  createItem(values: ItemPayloadRequest): Observable<unknown> {
    return this.http
      .post(`${this.baseUrl}/items/category/${values.categoryId}`, values)
      .pipe(tap(() => this.itemsChangedSource.next(undefined)));
  }

  private getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  private getItems(): Observable<ItemAdmin[]> {
    return this.http.get<ItemAdmin[]>(`${this.baseUrl}/items`);
  }
}
