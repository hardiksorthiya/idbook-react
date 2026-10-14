import { post } from './api';
import type { ForgotBody } from '../types/forgot';

export function forgotPassword(body: ForgotBody) {
  return post('/auth/forgot-password', body);
}
