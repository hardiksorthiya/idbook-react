type LoginResult = {
  token?: string;
  access_token?: string;
  data?: {
    token?: string;
    access_token?: string;
  };
};

export function saveToken(data: LoginResult | null) {
  const token = data?.data?.access_token || data?.data?.token || data?.access_token || data?.token;
  if (token) localStorage.setItem('token', token.trim());
}

export function getToken() {
  return (localStorage.getItem('token') || '').trim();
}

export function clearToken() {
  localStorage.removeItem('token');
}
