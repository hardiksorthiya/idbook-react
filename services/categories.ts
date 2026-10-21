import { get } from './api';
import type { CategoryItem } from '../types/category';

type CategoryResult = {
  data?: CategoryItem[];
};

export async function getCategories() {
  const data = await get('/categories') as CategoryResult | null;
  return (data?.data || []).slice().sort((a, b) => a.sort_order - b.sort_order);
}
