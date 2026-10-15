import { post } from './api';
import type { ContactBody, ContactResult } from '../types/contact';

export function sendContact(body: ContactBody) {
  return post('/contact', body) as Promise<ContactResult>;
}
