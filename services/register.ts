import { post } from './api';
import type { RegisterBody } from '../types/register';

export function registerUser(body: RegisterBody) {
  return post('/auth/register', body);
}
