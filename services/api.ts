import { apiError } from '../utils/apiError';
import { getToken } from '../utils/token';

// Change this to your API address.
export const baseUrl = 'http://43.204.108.94/api/v1';

export async function post(path: string, body: object, auth = false) {
  const token = auth ? getToken() : '';
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
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

export async function postForm(path: string, body: FormData) {
  const token = getToken();
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body,
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

export async function get(path: string) {
  const token = getToken();
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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

export async function del(path: string) {
  const token = getToken();
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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

export async function put(path: string, body: object) {
  const token = getToken();
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
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
