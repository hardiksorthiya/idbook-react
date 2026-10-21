export type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  description: string;
  products_count: number;
  image_url: string | null;
  thumb_url: string | null;
  sort_order: number;
};
