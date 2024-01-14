import { FormField } from './form-field.interface';
import { OrderItem } from './order-item.interface';


export interface OrderCategory {
  id: string;
  name: string;
  items: OrderItem[];
  formFields: FormField[];
}
