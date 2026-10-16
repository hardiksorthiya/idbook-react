import { get } from './api';
import type { BlogItem, BlogMeta } from '../types/blog';

type BlogResult = {
  data?: BlogItem[];
  meta?: BlogMeta;
};

export async function getBlogs(page = 1, perPage = 9) {
  const data = await get(`/blogs?page=${page}&per_page=${perPage}`) as BlogResult | null;
  return {
    items: data?.data || [],
    meta: data?.meta,
  };
}
