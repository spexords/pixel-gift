import { OrderCategory } from './order-category.interface';
import { OrderSummary } from '../../admin/admin-panel/models/order-summary.interface';


export interface OrderPreview {
  orderCategories: OrderCategory[];
  orderSummary: OrderSummary;
}
