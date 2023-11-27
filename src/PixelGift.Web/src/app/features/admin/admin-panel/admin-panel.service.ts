import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  switchMap,
  tap,
} from 'rxjs';
import { Category, CreateCategory, User } from 'src/app/core/models';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({ providedIn: 'root' })
export class AdminPanelService {
  private userSource = new ReplaySubject<User | null>();
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  private categoriesChangedSource = new BehaviorSubject<unknown>(false);
  private categoriesChanged = this.categoriesChangedSource.asObservable();

  user$ = this.userSource.asObservable();

  categories$ = this.categoriesChanged.pipe(
    switchMap(() => this.getCategories())
  );

  private getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  deleteCategory(id: string): Observable<unknown> {
    return this.http
      .delete(`${this.baseUrl}/categories/${id}`)
      .pipe(tap(() => this.categoriesChangedSource.next(true)));
  }

  createCategory(values: CreateCategory): Observable<unknown> {
    return this.http
      .post(`${this.baseUrl}/categories`, values)
      .pipe(tap(() => this.categoriesChangedSource.next(true)));
  }
}
