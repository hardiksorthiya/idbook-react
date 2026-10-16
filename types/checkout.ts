export type CheckoutLine = {
  product_id: number;
  name: string;
  slug: string;
  design_code: string;
  unit_price: number;
  quantity: number;
};

export type CheckoutTotals = {
  line_items: CheckoutLine[];
  subtotal: number;
  discount: number;
  coupon: string | null;
  taxable_amount: number;
  sac_code: string;
  sac_description: string;
  is_interstate: boolean;
  cgst_rate: number;
  cgst_amount: number;
  sgst_rate: number;
  sgst_amount: number;
  igst_rate: number;
  igst_amount: number;
  total_tax: number;
  final_amount: number;
};

export type CheckoutResult = {
  data?: CheckoutTotals;
};

export type OrderData = {
  order_number: string;
  final_amount: string;
  currency: string;
  gateway: string;
  gateway_order_id: string;
  gateway_payment_id: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
};

export type OrderResult = {
  message?: string;
  data?: OrderData;
};

export type VerifyResult = {
  status?: boolean;
  message?: string;
};
