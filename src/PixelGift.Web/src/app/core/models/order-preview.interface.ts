import { OrderCategory } from './order-category.interface';
import { OrderSummary } from './order-summary.interface';


export interface OrderPreview {
  orderCategories: OrderCategory[];
  orderSummary: OrderSummary;
}
