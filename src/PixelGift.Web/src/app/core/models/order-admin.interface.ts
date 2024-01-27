export interface OrderAdmin {
  id: string,
  createdAt: string,
  customerOrderId: number,
  email: string,
  status: string,
  paymentIntentId: string,
  total: number
}