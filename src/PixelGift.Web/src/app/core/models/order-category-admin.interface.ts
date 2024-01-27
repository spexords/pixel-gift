import { FormFieldData } from './form-field-data.interface';
import { OrderItemAdmin } from './order-item-admin.interface';

export interface OrderCategoryAdmin {
  name: string;
  promoCode?: string;
  subtotal: number;
  discount: number;
  total: number;
  metadata: FormFieldData[];
  items: OrderItemAdmin[];
}
