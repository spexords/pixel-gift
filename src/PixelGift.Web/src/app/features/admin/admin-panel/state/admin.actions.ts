import { createAction, props } from '@ngrx/store';

import { CategoryPayloadRequest, ChangePassword, DetailedCategory, DetailedItemAdmin, DetailedOrderAdmin, DetailedPromoCode, ItemAdmin, ItemPayloadRequest, MailMessageRequest, OrderAdmin, OrderSearchParams, PromoCode, PromoCodePayloadRequest } from '../models';
import { Category } from 'src/app/features/home/models';

export class AdminActions {
  static getCategories = createAction('[Admin] getCategories');
  static setCategories = createAction(
    '[Admin] setCategories',
    props<{ categories: Category[] }>(),
  );
  static getCategory = createAction(
    '[Admin] getCategory',
    props<{ id: string }>(),
  );
  static setCategory = createAction(
    '[Admin] setCategory',
    props<{ category: DetailedCategory }>(),
  );
  static deleteCategory = createAction(
    '[Admin] deleteCategory',
    props<{ id: string }>(),
  );
  static updateCategory = createAction(
    '[Admin] updateCategory',
    props<{ category: CategoryPayloadRequest }>(),
  );
  static createCategory = createAction(
    '[Admin] createCategory',
    props<{ category: CategoryPayloadRequest }>(),
  );

  static getItems = createAction('[Admin] getItems');
  static setItems = createAction(
    '[Admin] setItems',
    props<{ items: ItemAdmin[] }>(),
  );
  static getItem = createAction('[Admin] getItem', props<{ id: string }>());
  static setItem = createAction(
    '[Admin] setItem',
    props<{ item: DetailedItemAdmin }>(),
  );
  static deleteItem = createAction(
    '[Admin] deleteItem',
    props<{ id: string }>(),
  );
  static updateItem = createAction(
    '[Admin] updateItem',
    props<{ item: ItemPayloadRequest }>(),
  );
  static createItem = createAction(
    '[Admin] createItem',
    props<{ item: ItemPayloadRequest }>(),
  );

  static getPromoCodes = createAction('[Admin] getPromoCodes');
  static setPromoCodes = createAction(
    '[Admin] setPromoCodes',
    props<{ promoCodes: PromoCode[] }>(),
  );
  static getPromoCode = createAction(
    '[Admin] getPromoCode',
    props<{ id: string }>(),
  );
  static setPromoCode = createAction(
    '[Admin] setPromoCode',
    props<{ promoCode: DetailedPromoCode }>(),
  );
  static deletePromoCode = createAction(
    '[Admin] deletePromoCode',
    props<{ id: string }>(),
  );
  static updatePromoCode = createAction(
    '[Admin] updatePromoCode',
    props<{ promoCode: PromoCodePayloadRequest }>(),
  );
  static createPromoCode = createAction(
    '[Admin] createPromoCode',
    props<{ promoCode: PromoCodePayloadRequest }>(),
  );

  static getOrders = createAction('[Admin] getOrders');
  static setOrders = createAction(
    '[Admin] setOrders',
    props<{ orders: OrderAdmin[] }>(),
  );
  static setSearchParams = createAction(
    '[Admin] setSearchParams',
    props<{ searchParams: OrderSearchParams }>(),
  );
  static getOrder = createAction('[Admin] getOrder', props<{ id: string }>());
  static setOrder = createAction(
    '[Admin] setOrder',
    props<{ order: DetailedOrderAdmin }>(),
  );

  static updateOrder = createAction(
    '[Admin] updateOrder',
    props<{ id: string; status: string }>(),
  );
  static sendOrderMessage = createAction(
    '[Admin] sendOrderMessage',
    props<{ message: MailMessageRequest }>(),
  );

  static changePassword = createAction(
    '[Admin] changePassword',
    props<{ values: ChangePassword }>(),
  );
}
