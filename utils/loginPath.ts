export function loginPath() {
  const next = `${window.location.pathname}${window.location.search}`;
  return `/login?next=${encodeURIComponent(next)}`;
}

export function pathAfterLogin() {
  const next = new URLSearchParams(window.location.search).get('next') || '';
  if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/login')) return next;
  return '/profile';
}
