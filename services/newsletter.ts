import { post } from './api';
import type { NewsletterResult } from '../types/newsletter';

export function subscribeNewsletter(email: string) {
  return post('/newsletter/subscribe', { email }) as Promise<NewsletterResult>;
}
