type ApiFail = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function apiError(data: ApiFail | null) {
  const first = data?.errors ? Object.values(data.errors).flat()[0] : data?.message;
  return first || 'Something went wrong. Please try again.';
}
