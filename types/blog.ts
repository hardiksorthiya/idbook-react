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

export type BlogDetail = {
  id: number;
  title: string;
  slug: string;
  details: string;
  image_url: string | null;
  author: string;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string;
  tags: string[];
  related_posts: BlogItem[];
};

export type BlogMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
