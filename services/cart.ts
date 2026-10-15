import { baseUrl, del, get, post, put } from './api';
import { apiError } from '../utils/apiError';
import { getToken } from '../utils/token';
import type { CartResult } from '../types/cart';

export async function addToCart(productId: number) {
  const token = getToken();
  if (!token) throw new Error('Please login first.');

  let response: Response;

  try {
    response = await fetch(`${baseUrl}/cart/items`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    });
  } catch {
    throw new Error('Could not reach the server. Check the API address in services/api.ts.');
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(apiError(data));
  return data as CartResult;
}

export async function getCart() {
  if (!getToken()) throw new Error('Please login first.');
  const data = await get('/cart') as CartResult | null;
  if (!data?.data) throw new Error('Could not load cart.');
  return data.data;
}

export function updateCartItem(id: number, quantity: number) {
  if (!getToken()) return Promise.reject(new Error('Please login first.'));
  return put(`/cart/items/${id}`, { quantity }) as Promise<CartResult>;
}

export function removeCartItem(id: number) {
  if (!getToken()) return Promise.reject(new Error('Please login first.'));
  return del(`/cart/items/${id}`) as Promise<CartResult>;
}

export function clearCart() {
  if (!getToken()) return Promise.reject(new Error('Please login first.'));
  return del('/cart') as Promise<CartResult>;
}

export function applyCoupon(couponCode: string) {
  if (!getToken()) return Promise.reject(new Error('Please login first.'));
  return post('/cart/apply-coupon', { coupon_code: couponCode }, true) as Promise<CartResult>;
}
