import { post } from './api';
import type { CheckoutResult, OrderResult, VerifyResult } from '../types/checkout';

export function calculateCheckout(body: {
  state: string;
  coupon_code: string;
  customer_gstin: string;
  items: { product_id: number; quantity: number }[];
}) {
  return post('/checkout/calculate', body, true) as Promise<CheckoutResult>;
}

export function createOrder(body: {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  customer_gstin: string;
  company_name: string;
  payment_gateway: string;
  items: { product_id: number; quantity: number }[];
}) {
  return post('/checkout/create-order', body, true) as Promise<OrderResult>;
}

export function verifyPayment(body: {
  order_number: string;
  gateway: string;
  gateway_payment_id: string;
  gateway_signature: string;
}) {
  return post('/checkout/verify-payment', body, true) as Promise<VerifyResult>;
}
