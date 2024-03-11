import { OrderSummary } from '../../admin/admin-panel/models/order-summary.interface';

export interface OrderPaymentIntent {
  orderSummary: OrderSummary;
  paymentIntentId: string;
  clientSecret: string;
}
