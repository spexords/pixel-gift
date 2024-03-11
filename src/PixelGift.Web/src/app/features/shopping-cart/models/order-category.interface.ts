import { FormField } from './form-field.interface';
import { OrderItem } from '../../admin/admin-panel/models/order-item.interface';

export interface OrderCategory {
  id: string;
  name: string;
  items: OrderItem[];
  formFields: FormField[];
}
