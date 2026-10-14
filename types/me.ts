export type User = {
  name?: string;
  email?: string;
  phone_number?: string;
  phone?: string;
  professional_company?: string;
  company_name?: string;
  coa_registration_number?: string;
  gst_number?: string;
  gstin?: string;
  city?: string;
  state?: string;
  pincode?: string;
};

export type MeResult = User & {
  user?: User;
  data?: User;
};
