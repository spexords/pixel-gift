import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { BasketItems, OrderPreview } from 'src/app/core/models';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly BASKET_KEY = 'basket';
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);
  private basket: BasketItems = {};
  private basketUpdatedSource = new BehaviorSubject<unknown>(undefined);
  private basketUpdatedChanged$ = this.basketUpdatedSource
    .asObservable()
    .pipe(tap(() => this.saveToLocalStorage()));

  constructor() {
    this.tryLoadFromLocalStorage();
  }

  basket$ = this.basketUpdatedChanged$.pipe(map(() => this.basket));

  basketItemsCount$ = this.basketUpdatedChanged$.pipe(
    map(() =>
      Object.values(this.basket).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0)
    )
  );

  orderPreview$ = this.basketUpdatedChanged$.pipe(
    switchMap(() => this.getOrderPreview(this.basket))
  );

  addItem(itemId: string): void {
    itemId in this.basket
      ? this.increaseItemQuantity(itemId)
      : (this.basket[itemId] = 1);
    this.basketUpdatedSource.next(undefined);
  }

  increaseItemQuantity(itemId: string): void {
    this.basket[itemId]++;
    this.basketUpdatedSource.next(undefined);
  }

  decreaseItemQuantity(itemId: string): void {
    this.basket[itemId]--;
    this.basketUpdatedSource.next(undefined);
  }

  updateItemQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      delete this.basket[itemId];
    } else {
      this.basket[itemId] = quantity;
    }
    this.basketUpdatedSource.next(undefined);
  }

  clearBasket(): void {
    this.basket = {};
    this.basketUpdatedSource.next(undefined);
  }

  private getOrderPreview(values: BasketItems): Observable<OrderPreview> {
    return this.http.post<OrderPreview>(`${this.baseUrl}/orders/preview`, {
      basketItems: values,
    });
  }

  private saveToLocalStorage(): void {
    const basketSerialized = JSON.stringify(this.basket);
    window.localStorage.setItem(this.BASKET_KEY, basketSerialized);
  }

  private tryLoadFromLocalStorage(): void {
    const basketSerialized = window.localStorage.getItem(this.BASKET_KEY);
    if (basketSerialized) {
      const basket = JSON.parse(basketSerialized);
      console.log(basket);
      this.basket = basket;

      this.basketUpdatedSource.next(undefined);
    }
  }
}
