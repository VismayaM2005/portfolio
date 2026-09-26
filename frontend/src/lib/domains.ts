// Static mirror of backend/app/data.py DOMAINS, used for client-side styling
// (colors, labels) without an extra fetch. Keep in sync with the backend.
export interface DomainMeta {
  id: string;
  label: string;
  short: string;
  color: string;
  description: string;
}

export const DOMAIN_META: Record<string, DomainMeta> = {
  ai: {
    id: 'ai',
    label: 'AI / ML',
    short: 'AI/ML',
    color: 'var(--domain-ai)',
    description: 'Applied machine learning, generative AI, and evaluation/explainability.',
  },
  cv: {
    id: 'cv',
    label: 'Computer Vision',
    short: 'CV',
    color: 'var(--domain-cv)',
    description: 'Real-time detection, tracking, and video analytics.',
  },
  iot: {
    id: 'iot',
    label: 'IoT & Embedded',
    short: 'IoT',
    color: 'var(--domain-iot)',
    description: 'Sensors, microcontrollers, and on-device inference.',
  },
  backend: {
    id: 'backend',
    label: 'Backend & Systems',
    short: 'Backend',
    color: 'var(--domain-backend)',
    description: 'APIs, test infrastructure, async pipelines, and deployed full-stack apps.',
  },
};

export const DOMAIN_ORDER = ['ai', 'cv', 'iot', 'backend'];
