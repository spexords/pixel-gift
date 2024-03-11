import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import {
  Observable,
} from 'rxjs';
import { BasketItems } from 'src/app/core/basket/models';
import { OrderCreated } from 'src/app/features/shopping-cart/models/order-created.interface';
import { OrderPaymentIntent } from 'src/app/features/shopping-cart/models/order-payment-intent.interface';
import { PromoCodes, CategoryFormFieldsData, OrderPreview } from './models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private http = inject(HttpClient);
  private translocoService = inject(TranslocoService);

  createOrderPaymentIntent(
    basketItems: BasketItems,
    promoCodes: PromoCodes,
  ): Observable<OrderPaymentIntent> {
    return this.http.post<OrderPaymentIntent>('payments/intent', {
      basketItems,
      promoCodes,
    });
  }

  createOrder(
    basketItems: BasketItems,
    promoCodes: PromoCodes,
    categoryFormFieldsData: CategoryFormFieldsData,
    paymentIntentId: string,
    email: string,
  ): Observable<OrderCreated> {
    return this.http.post<OrderCreated>(`orders`, {
      basketItems,
      promoCodes,
      categoryFormFieldsData,
      paymentIntentId,
      email,
    });
  }

  getOrderPreview(
    basketItems: BasketItems,
    promoCodes: PromoCodes,
  ): Observable<OrderPreview> {
    return this.http.post<OrderPreview>(`orders/preview`, {
      basketItems,
      promoCodes,
      language: this.translocoService.getActiveLang(),
    });
  }

}
