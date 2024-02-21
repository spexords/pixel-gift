import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { isEmpty } from 'lodash';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  catchError,
  combineLatest,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  Category,
  CategoryPayloadRequest,
  ChangePassword,
  DetailedCategory,
  DetailedItemAdmin,
  DetailedOrderAdmin,
  DetailedPromoCode,
  ItemAdmin,
  ItemPayloadRequest,
  MailMessageRequest,
  OrderAdmin,
  OrderSearchParams,
  PromoCode,
  PromoCodePayloadRequest,
  User,
} from 'src/app/core/models';

@Injectable({ providedIn: 'root' })
export class AdminPanelService {
  private userSource = new ReplaySubject<User | null>();
  private http = inject(HttpClient);

  private categoriesChangedSource = new BehaviorSubject<unknown>(undefined);
  private categoriesChanged$ = this.categoriesChangedSource.asObservable();

  private itemsChangedSource = new BehaviorSubject<unknown>(undefined);
  private itemsChanged$ = this.itemsChangedSource.asObservable();

  private promoCodesChangedSource = new BehaviorSubject<unknown>(undefined);
  private promoCodesChanged$ = this.promoCodesChangedSource.asObservable();

  private ordersChangedSource = new BehaviorSubject<unknown>(undefined);
  private ordersChanged$ = this.ordersChangedSource.asObservable();
  private ordersSearchParamsChangedSource =
    new BehaviorSubject<OrderSearchParams>({
      status: null,
      customerOrderId: null,
    });
  private ordersSearchParamsChanged$ =
    this.ordersSearchParamsChangedSource.asObservable();

  user$ = this.userSource.asObservable();

  items$ = this.itemsChanged$.pipe(switchMap(() => this.getItems()));

  categories$ = this.categoriesChanged$.pipe(
    switchMap(() => this.getCategories())
  );

  promoCodes$ = this.promoCodesChanged$.pipe(
    switchMap(() => this.getPromoCodes())
  );

  categoriesAsSelectOptions$ = this.categories$.pipe(
    map((categories) =>
      categories.map((category) => ({
        value: category.id,
        displayValue: category.name,
      }))
    )
  );

  orders$ = combineLatest([
    this.ordersSearchParamsChanged$,
    this.ordersChanged$,
  ]).pipe(switchMap(([params]) => this.getOrders(params)));

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
    return this.http
      .delete(`categories/${id}`)
      .pipe(tap(() => this.categoriesChangedSource.next(undefined)));
  }

  deleteItem(id: string): Observable<unknown> {
    return this.http
      .delete(`items/${id}`)
      .pipe(tap(() => this.itemsChangedSource.next(undefined)));
  }

  deletePromoCode(id: string): Observable<unknown> {
    return this.http
      .delete(`promocodes/${id}`)
      .pipe(tap(() => this.promoCodesChangedSource.next(undefined)));
  }

  createCategory(values: CategoryPayloadRequest): Observable<unknown> {
    return this.http
      .post('categories', values)
      .pipe(tap(() => this.categoriesChangedSource.next(undefined)));
  }

  updateCategory(
    id: string,
    values: CategoryPayloadRequest
  ): Observable<unknown> {
    return this.http
      .put(`categories/${id}`, values)
      .pipe(tap(() => this.categoriesChangedSource.next(undefined)));
  }

  updateOrder(id: string, status: string) {
    return this.http
      .put(`orders/${id}`, { status })
      .pipe(tap(() => this.ordersChangedSource.next(undefined)));
  }

  getItem(id: string): Observable<DetailedItemAdmin> {
    return this.http.get<DetailedItemAdmin>(`items/${id}`);
  }

  createItem(values: ItemPayloadRequest): Observable<unknown> {
    return this.http
      .post(`items/category/${values.categoryId}`, values)
      .pipe(tap(() => this.itemsChangedSource.next(undefined)));
  }

  updateItem(id: string, values: ItemPayloadRequest): Observable<unknown> {
    return this.http
      .put(`items/${id}`, values)
      .pipe(tap(() => this.itemsChangedSource.next(undefined)));
  }

  createPromoCode(values: PromoCodePayloadRequest): Observable<unknown> {
    return this.http
      .post('promocodes', values)
      .pipe(tap(() => this.promoCodesChangedSource.next(undefined)));
  }

  updatePromoCode(
    id: string,
    values: PromoCodePayloadRequest
  ): Observable<unknown> {
    return this.http
      .put(`promocodes/${id}`, values)
      .pipe(tap(() => this.promoCodesChangedSource.next(undefined)));
  }

  notifyOrdersSearchParamsChanged(params: OrderSearchParams): void {
    this.ordersSearchParamsChangedSource.next(params);
  }

  sendOrderMessage(
    id: string,
    values: MailMessageRequest
  ): Observable<unknown> {
    return this.http.post(`orders/${id}/send-message`, values).pipe(
      catchError((error) => {
        const message: string = error.error.errors.message;
        alert(message);
        return throwError(() => error);
      })
    );
  }

  private getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('categories');
  }

  private getItems(): Observable<ItemAdmin[]> {
    return this.http.get<ItemAdmin[]>('items');
  }

  private getPromoCodes(): Observable<PromoCode[]> {
    return this.http.get<PromoCode[]>('promocodes');
  }

  private getOrders(searchParams: OrderSearchParams): Observable<OrderAdmin[]> {
    let params = new HttpParams();

    if (!isEmpty(searchParams.customerOrderId)) {
      params = params.append(
        'customerOrderId',
        searchParams.customerOrderId as number
      );
    }

    if (!isEmpty(searchParams.status)) {
      params = params.append('status', searchParams.status as string);
    }

    return this.http.get<OrderAdmin[]>('orders', { params });
  }
}
