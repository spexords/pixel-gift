import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AdminPanelService } from '../admin-panel.service';
import { AdminActions } from './admin.actions';
import {
  catchError,
  map,
  switchMap,
  tap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { AdminSelectors } from './admin.selectors';
import { MatDialog } from '@angular/material/dialog';
import { OrderSearchParams } from '../models';

@Injectable()
export class AdminEffects {
  private actions = inject(Actions);
  private dialog = inject(MatDialog);
  private store = inject(Store);
  private adminPanelService = inject(AdminPanelService);

  getCategories = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getCategories),
      switchMap(() =>
        this.adminPanelService
          .getCategories()
          .pipe(
            map((categories) => AdminActions.setCategories({ categories })),
          ),
      ),
    ),
  );

  getCategory = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getCategory),
      switchMap(({ id }) =>
        this.adminPanelService
          .getCategory(id)
          .pipe(map((category) => AdminActions.setCategory({ category }))),
      ),
    ),
  );

  createCategory = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.createCategory),
      switchMap(({ category }) =>
        this.adminPanelService.createCategory(category).pipe(
          tap(() => {
            alert('Category created');
            this.dialog.closeAll();
          }),
          map(() => AdminActions.getCategories()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  updateCategory = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.updateCategory),
      switchMap(({ category }) =>
        this.adminPanelService.updateCategory(category.id, category).pipe(
          tap(() => {
            alert('Category updated');
            this.dialog.closeAll();
          }),
          map(() => AdminActions.getCategories()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  deleteCategory = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.deleteCategory),
      switchMap(({ id }) =>
        this.adminPanelService.deleteCategory(id).pipe(
          tap(() => alert('Category deleted')),
          map(() => AdminActions.getCategories()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  getItems = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getItems),
      switchMap(() =>
        this.adminPanelService
          .getItems()
          .pipe(map((items) => AdminActions.setItems({ items }))),
      ),
    ),
  );

  getItem = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getItem),
      switchMap(({ id }) =>
        this.adminPanelService
          .getItem(id)
          .pipe(map((item) => AdminActions.setItem({ item }))),
      ),
    ),
  );

  createItem = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.createItem),
      switchMap(({ item }) =>
        this.adminPanelService.createItem(item).pipe(
          tap(() => {
            alert('Item created');
            this.dialog.closeAll();
          }),
          map(() => AdminActions.getItems()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  updateItem = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.updateItem),
      switchMap(({ item }) =>
        this.adminPanelService.updateItem(item.id, item).pipe(
          tap(() => {
            alert('Item updated');
            this.dialog.closeAll();
          }),
          map(() => AdminActions.getItems()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  deleteItem = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.deleteItem),
      switchMap(({ id }) =>
        this.adminPanelService.deleteItem(id).pipe(
          tap(() => alert('Item deleted')),
          map(() => AdminActions.getItems()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  getPromoCodes = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getPromoCodes),
      switchMap(() =>
        this.adminPanelService
          .getPromoCodes()
          .pipe(
            map((promoCodes) => AdminActions.setPromoCodes({ promoCodes })),
          ),
      ),
    ),
  );

  getPromoCode = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getPromoCode),
      switchMap(({ id }) =>
        this.adminPanelService
          .getPromoCode(id)
          .pipe(map((promoCode) => AdminActions.setPromoCode({ promoCode }))),
      ),
    ),
  );

  createPromoCode = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.createPromoCode),
      switchMap(({ promoCode }) =>
        this.adminPanelService.createPromoCode(promoCode).pipe(
          tap(() => {
            alert('Promo code created');
            this.dialog.closeAll();
          }),
          map(() => AdminActions.getPromoCodes()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  updatePromoCode = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.updatePromoCode),
      switchMap(({ promoCode }) =>
        this.adminPanelService.updatePromoCode(promoCode.id, promoCode).pipe(
          tap(() => {
            alert('Promo code updated');
            this.dialog.closeAll();
          }),
          map(() => AdminActions.getPromoCodes()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  deletePromoCode = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.deletePromoCode),
      switchMap(({ id }) =>
        this.adminPanelService.deleteItem(id).pipe(
          tap(() => alert('Promo code deleted')),
          map(() => AdminActions.getPromoCodes()),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  getOrders = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getOrders, AdminActions.setSearchParams),
      withLatestFrom(this.store.select(AdminSelectors.selectSearchParams)),
      switchMap(([, searchParams]) =>
        this.adminPanelService
          .getOrders(searchParams ?? ({} as OrderSearchParams))
          .pipe(map((orders) => AdminActions.setOrders({ orders }))),
      ),
    ),
  );

  getOrder = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.getOrder),
      switchMap(({ id }) =>
        this.adminPanelService
          .getOrder(id)
          .pipe(map((order) => AdminActions.setOrder({ order }))),
      ),
    ),
  );

  updateOrder = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.updateOrder),
      switchMap(({ id, status }) =>
        this.adminPanelService.updateOrder(id, status).pipe(
          tap(() => {
            alert('Order status updated!');
            this.dialog.closeAll();
          }),
          map(() => AdminActions.getOrder({ id })),
          catchError((err) => {
            alert(err.error.errors.message);
            return throwError(() => err);
          }),
        ),
      ),
    ),
  );

  sendOrderMessage = createEffect(
    () =>
      this.actions.pipe(
        ofType(AdminActions.sendOrderMessage),
        switchMap(({ message }) =>
          this.adminPanelService
            .sendOrderMessage(message.orderId, message)
            .pipe(
              tap(() => alert('Message sent succesfully')),
              map(() => AdminActions.getOrder({id: message.orderId})),
              catchError((err) => {
                alert(err.error.errors.message);
                return throwError(() => err);
              }),
            ),
        ),
      )
  );

  changePassword = createEffect(
    () =>
      this.actions.pipe(
        ofType(AdminActions.changePassword),
        switchMap(({ values }) =>
          this.adminPanelService.changePassword(values).pipe(
            tap(() => alert('Password changed succesfully')),
            catchError((err) => {
              alert(err.error.errors.message);
              return throwError(() => err);
            }),
          ),
        ),
      ),
    { dispatch: false },
  );
}
