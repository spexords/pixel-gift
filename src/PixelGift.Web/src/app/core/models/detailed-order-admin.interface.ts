import { OrderCategoryAdmin } from './order-category-admin.interface';

export interface DetailedOrderAdmin {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  customerOrderId: number;
  email: string;
  status: string;
  paymentIntentId: string;
  categories: OrderCategoryAdmin[];
  subtotal: number;
  discount: number;
  total: number;
}


