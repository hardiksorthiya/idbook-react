import { post } from './api';
import type { LoginBody } from '../types/login';

export function loginUser(body: LoginBody) {
  return post('/auth/login', body);
}
