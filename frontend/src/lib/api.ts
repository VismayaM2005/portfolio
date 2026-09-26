import type { Book, BookSummary, Credentials, Domain, Genre, Profile } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getProfile() {
  return apiGet<Profile>('/api/profile');
}

export function getDomains() {
  return apiGet<Domain[]>('/api/domains');
}

export function getGenres() {
  return apiGet<Genre[]>('/api/genres');
}

export function getBooks(params?: { domain?: string; genre?: string; kind?: string }) {
  const qs = new URLSearchParams();
  if (params?.domain) qs.set('domain', params.domain);
  if (params?.genre) qs.set('genre', params.genre);
  if (params?.kind) qs.set('kind', params.kind);
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return apiGet<BookSummary[]>(`/api/books${suffix}`);
}

export function getBook(slug: string) {
  return apiGet<Book>(`/api/books/${encodeURIComponent(slug)}`);
}

export function getCredentials() {
  return apiGet<Credentials>('/api/credentials');
}

export async function postContact(payload: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail ? JSON.stringify(body.detail) : `Contact submit failed: ${res.status}`);
  }
  return res.json() as Promise<{ ok: boolean; receivedAt: string }>;
}
