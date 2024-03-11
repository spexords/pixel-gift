import { MailMessage } from './mail-message-interface';
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
  messages: MailMessage[];
  subtotal: number;
  discount: number;
  total: number;
}
