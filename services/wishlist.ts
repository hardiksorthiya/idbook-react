import { get, post } from './api';
import { getToken } from '../utils/token';
import type { WishData, WishToggle } from '../types/wishlist';

export function toggleWishlist(productId: number) {
  if (!getToken()) return Promise.reject(new Error('Please login first.'));
  return post('/wishlist/toggle', { product_id: productId }, true) as Promise<WishToggle>;
}

export async function getWishlist() {
  if (!getToken()) throw new Error('Please login first.');
  const data = await get('/wishlist') as { data?: WishData } | null;
  if (!data?.data) throw new Error('Could not load wishlist.');
  return data.data;
}
