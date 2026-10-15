import { put } from './api';
import { getToken } from '../utils/token';
import type { PasswordBody } from '../types/password';

export function changePassword(body: PasswordBody) {
  if (!getToken()) {
    return Promise.reject(new Error('Please login first.'));
  }

  return put('/auth/password', body, true);
}
