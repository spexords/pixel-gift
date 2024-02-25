import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Item } from 'src/app/core/models';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

@Injectable({ providedIn: 'root' })
export class GiftStoreService {
  private http = inject(HttpClient);
  private shoppingCartService = inject(ShoppingCartService);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('categories').pipe();
  }

  getItems(categoryId: string, lang: string): Observable<Item[]> {
    return this.http.get<Item[]>(`items/category/${categoryId}?lang=${lang}`);
  }

  addItemToShoppingCart(itemId: string): void {
    this.shoppingCartService.addItem(itemId);
  }
}
