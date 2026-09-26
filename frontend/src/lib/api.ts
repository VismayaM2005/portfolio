import type {
  Credentials,
  Domain,
  ExperienceEntry,
  Profile,
  Project,
  ProjectSummary,
} from './types';

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

export function getProjects(domain?: string) {
  const qs = domain ? `?domain=${encodeURIComponent(domain)}` : '';
  return apiGet<ProjectSummary[]>(`/api/projects${qs}`);
}

export function getProject(slug: string) {
  return apiGet<Project>(`/api/projects/${encodeURIComponent(slug)}`);
}

export function getExperience() {
  return apiGet<ExperienceEntry[]>('/api/experience');
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
