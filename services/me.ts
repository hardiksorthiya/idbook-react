import { get } from './api';
import { getToken } from '../utils/token';
import type { MeResult, User } from '../types/me';

export function getMe() {
  if (!getToken()) {
    return Promise.reject(new Error('Please login first.'));
  }

  return get('/auth/me') as Promise<MeResult | null>;
}

export function readUser(data: MeResult | null): User | null {
  if (!data) return null;
  if (data.user) return data.user;
  if (data.data?.user) return data.data.user;
  if (data.data?.name || data.data?.email) return data.data;
  return data;
}
