import { get, post } from './api';
import { getToken } from '../utils/token';
import type { ProductDetail, ProductFilters, ProductItem } from '../types/product';

type ProductResult = {
  data?: ProductItem[];
};

type ProductOne = {
  data?: ProductDetail;
};

type FilterResult = {
  data?: ProductFilters;
};

export async function getProducts(params?: { is_featured?: boolean }) {
  const query = params?.is_featured ? '?is_featured=true' : '';
  const data = await get(`/products${query}`) as ProductResult | null;
  return data?.data || [];
}

export async function getProductFilters() {
  const data = await get('/products/filters') as FilterResult | null;
  if (!data?.data) throw new Error('Could not load filters.');
  return data.data;
}

export async function getProduct(slug: string) {
  const data = await get(`/products/${slug}`) as ProductOne | null;
  if (!data?.data) throw new Error('Product not found.');
  return data.data;
}

export function addProductReview(
  slug: string,
  body: { rating: number; title: string; details: string },
) {
  if (!getToken()) return Promise.reject(new Error('Please login first.'));
  return post(`/products/${slug}/reviews`, body, true) as Promise<{ message?: string }>;
}
