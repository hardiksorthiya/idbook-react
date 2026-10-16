import { del, postForm, put } from './api';
import { getToken } from '../utils/token';
import type { ProfileBody } from '../types/profile';

export function updateProfile(body: ProfileBody, photo?: File | null) {
  if (!getToken()) {
    return Promise.reject(new Error('Please login first.'));
  }

  if (!photo) return put('/auth/profile', body);

  const form = new FormData();
  form.append('_method', 'PUT');
  Object.entries(body).forEach(([key, value]) => form.append(key, value));
  form.append('profile_image', photo);

  return postForm('/auth/profile', form);
}

export function deleteAccount(reason: string) {
  if (!getToken()) {
    return Promise.reject(new Error('Please login first.'));
  }

  return del('/auth/account', { reason }) as Promise<{ message?: string }>;
}
