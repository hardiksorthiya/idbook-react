import { get } from './api';
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

export async function getProducts() {
  const data = await get('/products') as ProductResult | null;
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
