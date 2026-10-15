export type WishItem = {
  id: number;
  product_id: number;
  name: string;
  slug: string;
  price: number;
  mrp_price: number;
  room_dimensions: string;
  image_url: string | null;
  category_name: string;
};

export type WishData = {
  total: number;
  items: WishItem[];
};

export type WishToggle = {
  message?: string;
  is_wishlisted?: boolean;
};
