import { get } from './api';
import type { SearchItem } from '../types/search';

type SearchResult = {
  data?: SearchItem[];
};

export async function searchProducts(q: string) {
  const data = await get(`/products/search-suggestions?q=${encodeURIComponent(q)}`) as SearchResult | null;
  return data?.data || [];
}
