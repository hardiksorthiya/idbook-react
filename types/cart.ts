export type CartItem = {
  id: number;
  product_id: number;
  design_code: string;
  name: string;
  slug: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  room_dimensions: string;
  image_url: string | null;
  category_name: string;
};

export type CartSummary = {
  total_items: number;
  subtotal: number;
  discount: number;
  taxable_amount: number;
  estimated_tax: number;
  tax_rate_percentage: number;
  final_amount: number;
};

export type CartData = {
  cart_id: number | null;
  items: CartItem[];
  summary: CartSummary;
};

export type CartResult = {
  message?: string;
  data?: CartData;
};
