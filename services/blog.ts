import { get } from './api';
import type { BlogDetail, BlogItem, BlogMeta } from '../types/blog';

type BlogResult = {
  data?: BlogItem[];
  meta?: BlogMeta;
};

type BlogOne = {
  data?: BlogDetail;
};

export async function getBlogs(page = 1, perPage = 9) {
  const data = await get(`/blogs?page=${page}&per_page=${perPage}`) as BlogResult | null;
  return {
    items: data?.data || [],
    meta: data?.meta,
  };
}

export async function getBlog(slug: string) {
  const data = await get(`/blogs/${slug}`) as BlogOne | null;
  if (!data?.data) throw new Error('Blog post not found.');
  return data.data;
}
