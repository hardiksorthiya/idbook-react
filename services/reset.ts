import { post } from './api';
import type { ResetBody } from '../types/reset';

export function resetPassword(body: ResetBody) {
  return post('/auth/reset-password', body);
}
