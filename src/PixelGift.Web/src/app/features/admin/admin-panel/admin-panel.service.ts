import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';

import { CategoryPayloadRequest, ChangePassword, DetailedCategory, DetailedItemAdmin, DetailedOrderAdmin, DetailedPromoCode, ItemAdmin, ItemPayloadRequest, MailMessageRequest, OrderAdmin, OrderSearchParams, PromoCode, PromoCodePayloadRequest } from './models';
import { Category } from '../../home/models';

@Injectable({ providedIn: 'root' })
export class AdminPanelService {
  private http = inject(HttpClient);

  changePassword(values: ChangePassword): Observable<unknown> {
    return this.http.post('account/change-password', values);
  }

  getCategory(id: string): Observable<DetailedCategory> {
    return this.http.get<DetailedCategory>(`categories/${id}`);
  }

  getPromoCode(id: string): Observable<DetailedPromoCode> {
    return this.http.get<DetailedPromoCode>(`promocodes/${id}`);
  }

  getOrder(id: string): Observable<DetailedOrderAdmin> {
    return this.http.get<DetailedOrderAdmin>(`orders/${id}`);
  }

  deleteCategory(id: string): Observable<unknown> {
    return this.http.delete(`categories/${id}`);
  }

  deleteItem(id: string): Observable<unknown> {
    return this.http.delete(`items/${id}`);
  }

  deletePromoCode(id: string): Observable<unknown> {
    return this.http.delete(`promocodes/${id}`);
  }

  createCategory(values: CategoryPayloadRequest): Observable<unknown> {
    return this.http.post('categories', values);
  }

  updateCategory(
    id: string,
    values: CategoryPayloadRequest,
  ): Observable<unknown> {
    return this.http.put(`categories/${id}`, values);
  }

  updateOrder(id: string, status: string) {
    return this.http.put(`orders/${id}`, { status });
  }

  getItem(id: string): Observable<DetailedItemAdmin> {
    return this.http.get<DetailedItemAdmin>(`items/${id}`);
  }

  createItem(values: ItemPayloadRequest): Observable<unknown> {
    return this.http.post(`items/category/${values.categoryId}`, values);
  }

  updateItem(id: string, values: ItemPayloadRequest): Observable<unknown> {
    return this.http.put(`items/${id}`, values);
  }

  createPromoCode(values: PromoCodePayloadRequest): Observable<unknown> {
    return this.http.post('promocodes', values);
  }

  updatePromoCode(
    id: string,
    values: PromoCodePayloadRequest,
  ): Observable<unknown> {
    return this.http.put(`promocodes/${id}`, values);
  }

  sendOrderMessage(
    id: string,
    values: MailMessageRequest,
  ): Observable<unknown> {
    return this.http.post(`orders/${id}/send-message`, values);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('categories');
  }

  getItems(): Observable<ItemAdmin[]> {
    return this.http.get<ItemAdmin[]>('items');
  }

  getPromoCodes(): Observable<PromoCode[]> {
    return this.http.get<PromoCode[]>('promocodes');
  }

  getOrders(searchParams: OrderSearchParams): Observable<OrderAdmin[]> {
    let params = new HttpParams();

    if (!isEmpty(searchParams.customerOrderId)) {
      params = params.append(
        'customerOrderId',
        searchParams.customerOrderId as number,
      );
    }

    if (!isEmpty(searchParams.status)) {
      params = params.append('status', searchParams.status as string);
    }

    return this.http.get<OrderAdmin[]>('orders', { params });
  }
}
