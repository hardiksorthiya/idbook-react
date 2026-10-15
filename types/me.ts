export type User = {
  id?: number;
  name?: string;
  full_name?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  phone?: string;
  account_status?: string;
  email_verified?: boolean;
  is_professional?: boolean;
  professional_status?: string;
  professional_company?: string;
  company_name?: string;
  coa_registration_number?: string;
  gst_number?: string;
  gstin?: string;
  city?: string;
  state?: string;
  pincode?: string;
  created_at?: string;
  profile?: {
    about?: string | null;
    company?: string | null;
    designation?: string | null;
    coa_registration_number?: string | null;
    gst_number?: string | null;
    profile_image_url?: string | null;
  };
};

export type MeResult = User & {
  user?: User;
  data?: User & { user?: User };
};
