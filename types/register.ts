export type RegisterBody = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  is_professional: boolean;
  professional_company?: string;
  professional_designation?: string;
  coa_registration_number?: string;
  gst_number?: string;
  about?: string;
};
