type LoginResult = {
  token?: string;
  access_token?: string;
};

export function saveToken(data: LoginResult | null) {
  const token = data?.token || data?.access_token;
  if (token) localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token') || '';
}

export function clearToken() {
  localStorage.removeItem('token');
}
