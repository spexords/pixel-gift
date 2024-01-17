import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { isEmpty } from 'lodash';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { BasketItems, FormFieldData, OrderPreview } from 'src/app/core/models';
import { OrderPaymentIntent } from 'src/app/core/models/order-payment-intent.interface';
import { API_URL } from 'src/app/core/tokens/api-url.token';

type PromoCodes = Record<string, string>;

type CategoryFormFieldsData = Record<string, FormFieldData[]>;

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly BASKET_KEY = 'basket';
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);
  private translocoService = inject(TranslocoService);
  private router = inject(Router);

  private basket: BasketItems = {};
  private basketUpdatedSource = new BehaviorSubject<unknown>(undefined);
  private basketUpdatedChanged$ = this.basketUpdatedSource
    .asObservable()
    .pipe(tap(() => this.saveToLocalStorage()));

  private promoCodes: PromoCodes = {};
  private promoCodesUpdatedSource = new BehaviorSubject<unknown>(undefined);
  private promoCodesUpdatedChanged$ =
    this.promoCodesUpdatedSource.asObservable();

  private categoryFormFieldsData: CategoryFormFieldsData = {};

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

  orderPreview$ = combineLatest([
    this.translocoService.langChanges$,
    this.basketUpdatedChanged$,
    this.promoCodesUpdatedChanged$,
  ]).pipe(switchMap(() => this.getOrderPreview()));

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

  updatePromoCodes(categoryId: string, code: string): void {
    this.promoCodes[categoryId] = code;
    this.promoCodesUpdatedSource.next(undefined);
  }

  updateFormFieldData(categoryId: string, formFieldsData: FormFieldData[]) {
    this.categoryFormFieldsData[categoryId] = formFieldsData;
  }

  tryMoveToCheckout(): void {
    try {
      this.validateFormFieldsData();
      this.router.navigate(['/shopping-cart/checkout']);
    } catch {
      const message =
        this.translocoService.getActiveLang() === 'en'
          ? 'Please fill all the fields. It is needed to complete your order.'
          : 'Proszę wypłenić wszystkie pola. Pozwoli to na zrealizowanie twojego zamówienia';
      alert(message);
    }
  }

  getFormFieldsData(categoryId: string): FormFieldData[] {
    return categoryId in this.categoryFormFieldsData
      ? this.categoryFormFieldsData[categoryId]
      : [];
  }

  getPromoCode(categoryId: string): string {
    return this.promoCodes[categoryId];
  }

  createOrderPaymentIntent(): Observable<OrderPaymentIntent> {
    return this.http.post<OrderPaymentIntent>(
      `${this.baseUrl}/payments/intent`,
      {
        basketItems: this.basket,
        promoCodes: this.promoCodes,
      }
    );
  }

  private validateFormFieldsData(): void {
    for (const formFieldData of Object.values(this.categoryFormFieldsData)) {
      if (formFieldData.some((data) => isEmpty(data.value))) {
        throw new Error('Invalid form field data');
      }
    }
  }

  private getOrderPreview(): Observable<OrderPreview> {
    return this.http.post<OrderPreview>(`${this.baseUrl}/orders/preview`, {
      basketItems: this.basket,
      promoCodes: this.promoCodes,
      language: this.translocoService.getActiveLang(),
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
      this.basket = basket;
      this.basketUpdatedSource.next(undefined);
    }
  }

  // private getPromoCodeRequests(): PromoCodeRequest[] {
  //   return Object.entries(this.promoCodes).map(([categoryId, code]) => ({
  //     categoryId,
  //     code,
  //   }));
  // }
}
