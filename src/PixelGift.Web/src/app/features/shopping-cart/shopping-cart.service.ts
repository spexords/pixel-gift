import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BasketItems, FormFieldData, OrderPreview } from 'src/app/core/models';
import { OrderCreated } from 'src/app/core/models/order-created.interface';
import { OrderPaymentIntent } from 'src/app/core/models/order-payment-intent.interface';

type PromoCodes = Record<string, string>;

type CategoryFormFieldsData = Record<string, FormFieldData[]>;

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly BASKET_KEY = 'basket';
  private http = inject(HttpClient);
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
  private paymentIntentId: string | null = null;
  private validCheckout: boolean = false;

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
  ]).pipe(
    switchMap(() => this.getOrderPreview()),
    shareReplay()
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
    this.promoCodes = {};
    this.categoryFormFieldsData = {};
    this.paymentIntentId = null;
    this.basketUpdatedSource.next(undefined);
  }

  updatePromoCodes(categoryId: string, code: string): void {
    this.promoCodes[categoryId] = code;
    this.promoCodesUpdatedSource.next(undefined);
  }

  tryMoveToCheckout(formGroup: FormGroup): void {
    if (!this.validateFormFieldsData(formGroup)) {
      return;
    }

    this.updateCategoryFormFieldsData(formGroup);
    this.validCheckout = true;
    this.router.navigate(['/shopping-cart/checkout']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  validateFormFieldsData(formGroup: FormGroup): boolean {
    const result = formGroup.valid;
    if (!result) {
      const message =
        this.translocoService.getActiveLang() === 'en'
          ? 'Please fill all the fields. It is needed to complete your order.'
          : 'Proszę wypłenić wszystkie pola. Pozwoli to na zrealizowanie twojego zamówienia';
      alert(message);

      this.navigateToErrors();
    }
    return result;
  }

  navigateToErrors() {
    const errorValidationMessagesElements =
      document.getElementsByClassName('error-validation');

    if (errorValidationMessagesElements.length > 0) {
      const firstErrorValidationMessagesElement =
        errorValidationMessagesElements[0];
      firstErrorValidationMessagesElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  markFormFieldsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormFieldsAsTouched(control);
      }
    });
  }

  updateCategoryFormFieldsData(formGroup: FormGroup) {
    for (let [categoryKey, formValues] of Object.entries(formGroup.value)) {
      this.categoryFormFieldsData[categoryKey] = [];
      for (let [key, value] of Object.entries(
        formValues as Record<string, string>
      )) {
        if (key !== 'promoCode') {
          this.categoryFormFieldsData[categoryKey].push({ key, value });
        }
      }
    }
  }

  createOrderPaymentIntent(): Observable<OrderPaymentIntent> {
    return this.http
      .post<OrderPaymentIntent>('payments/intent', {
        basketItems: this.basket,
        promoCodes: this.promoCodes,
      })
      .pipe(
        tap((orderPaymentIntent) => {
          this.paymentIntentId = orderPaymentIntent.paymentIntentId;
        })
      );
  }

  canCheckout(): boolean {
    return this.validCheckout;
  }

  createOrder(email: string): Observable<OrderCreated> {
    return this.http.post<OrderCreated>(`orders`, {
      basketItems: this.basket,
      promoCodes: this.promoCodes,
      categoryFormFieldsData: this.categoryFormFieldsData,
      paymentIntentId: this.paymentIntentId,
      email: email,
    });
  }

  handleOrderCreateError(error: HttpErrorResponse): Observable<never> {
    const code = error.status;
    const message: string = error.error.errors.message;
    if (
      code == 400 &&
      (message.includes('Could not find') ||
        message.includes("Invalid requested item's quantity") ||
        message.includes('Could not create order'))
    ) {
      alert(
        this.translocoService.getActiveLang() === 'en'
          ? 'Invalid request - clearing basket. Please complete your shopping cart again.'
          : 'Nieprawidłowe żądanie - czyszczenie koszyka. Proszę wypełnić koszyk ponownie.'
      );
      this.router.navigate(['/']);
      this.clearBasket();
    }
    return throwError(() => error);
  }

  private getOrderPreview(): Observable<OrderPreview> {
    return this.http
      .post<OrderPreview>(`orders/preview`, {
        basketItems: this.basket,
        promoCodes: this.promoCodes,
        language: this.translocoService.getActiveLang(),
      })
      .pipe(catchError((error) => this.handleOrderPreviewError(error)));
  }

  private handleOrderPreviewError(error: HttpErrorResponse): Observable<never> {
    const code = error.status;
    const message: string = error.error.errors.message;
    if (
      code == 400 &&
      (message.includes('Could not find') ||
        message.includes("Invalid requested item's quantity"))
    ) {
      alert(
        this.translocoService.getActiveLang() === 'en'
          ? 'Invalid request - clearing basket. Please complete your shopping cart again.'
          : 'Nieprawidłowe żądanie - czyszczenie koszyka. Proszę wypełnić koszyk ponownie.'
      );
      this.router.navigate(['/']);
      this.clearBasket();
    }
    return throwError(() => error);
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
}
