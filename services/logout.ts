import { baseUrl } from './api';
import { apiError } from '../utils/apiError';
import { getToken } from '../utils/token';

export async function logoutUser() {
  const token = getToken();
  if (!token) return null;

  let response: Response;

  try {
    response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: '{}',
    });
  } catch {
    throw new Error('Could not reach the server. Check the API address in services/api.ts.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(apiError(data));
  }

  return data;
}
