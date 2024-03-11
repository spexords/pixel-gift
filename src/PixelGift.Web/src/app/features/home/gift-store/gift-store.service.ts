import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Item } from '../models';

@Injectable({ providedIn: 'root' })
export class GiftStoreService {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('categories').pipe();
  }

  getItems(categoryId: string, lang: string): Observable<Item[]> {
    return this.http.get<Item[]>(`items/category/${categoryId}?lang=${lang}`);
  }
}
