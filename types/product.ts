export type ProductFilters = {
  design_styles: string[];
  price_range: {
    min: number;
    max: number;
  };
  categories: {
    id: number;
    name: string;
    slug: string;
    count: number;
  }[];
};

export type ProductItem = {
  id: number;
  design_code: string;
  name: string;
  slug: string;
  price: number;
  mrp_price: number;
  discount_percentage: number;
  room_dimensions: string;
  design_style: string | null;
  is_featured: boolean;
  main_image_url: string | null;
  thumb_url: string | null;
  primary_category: {
    name: string;
    slug: string;
  } | null;
};

export type RelatedProduct = {
  id: number;
  name: string;
  slug: string;
  price: number;
  thumb_url?: string | null;
  main_image_url?: string | null;
  room_dimensions?: string | null;
  primary_category?: { name: string } | null;
};

export type ProductDetail = {
  id: number;
  design_code: string;
  name: string;
  slug: string;
  tag: string | null;
  price: number;
  mrp_price: number;
  discount_percentage: number;
  room_dimensions: string;
  carpet_area_sqft: number;
  design_style: string | null;
  description: string | null;
  short_description: string | null;
  specification: Record<string, string> | null;
  rating: number;
  reviews_count: number;
  designer: { name: string } | null;
  categories: { name: string; slug: string }[];
  main_image_url?: string | null;
  thumb_url?: string | null;
  gallery: Array<string | { url?: string | null; image_url?: string | null; thumb_url?: string | null }>;
  deliverables: { code: string; label: string; available: boolean; details: string }[];
  reviews: { id: number; author: string; rating: number; review_text: string | null; created_at: string }[];
  related_products: RelatedProduct[];
};
