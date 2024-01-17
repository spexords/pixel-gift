import { OrderSummary } from './order-summary.interface';

export interface OrderPaymentIntent {
  orderSummary: OrderSummary;
  paymentIntentId: string;
  clientSecret: string;
}
