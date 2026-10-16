export type BlogItem = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image_url: string | null;
  author: string;
  published_at: string;
  tags: string[];
};

export type BlogMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
