import { post } from './api';
import { getToken } from '../utils/token';

export function logoutUser() {
  if (!getToken()) {
    return Promise.resolve(null);
  }

  return post('/auth/logout', {}, true);
}
