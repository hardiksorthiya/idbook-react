export type ContactBody = {
  name: string;
  email: string;
  phone: string;
  room_type: string;
  carpet_area_sqft: number;
  budget_range: string;
  preferred_style: string;
  message: string;
};

export type ContactResult = {
  message?: string;
};
