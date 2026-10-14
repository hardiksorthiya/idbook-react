import { put } from './api';
import { getToken } from '../utils/token';
import type { ProfileBody } from '../types/profile';

export function updateProfile(body: ProfileBody) {
  if (!getToken()) {
    return Promise.reject(new Error('Please login first.'));
  }

  return put('/auth/me', body);
}
