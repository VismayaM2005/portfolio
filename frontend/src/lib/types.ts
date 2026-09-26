export interface Domain {
  id: string;
  label: string;
  short: string;
  color: string;
  description: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Capability {
  domain: string;
  level: number;
}

export interface Profile {
  name: string;
  location: string;
  tagline: string;
  abstract: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  stats: Stat[];
  capabilities: Capability[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface QAItem {
  q: string;
  a: string;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  subtitle: string;
  domains: string[];
  status: string[];
  summary: string;
  featured: boolean;
}

export interface Project extends ProjectSummary {
  team: string;
  role: string;
  teammates?: string | null;
  whatWorked: string[];
  limitations: string[];
  metrics: Metric[];
  techStack: string[];
  qa: QAItem[];
  note?: string | null;
  repoUrl?: string | null;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  start: string;
  end?: string | null;
  status: string;
  points: string[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  score: string;
}

export interface Program {
  title: string;
  org: string;
  detail: string;
}

export interface Course {
  title: string;
  org: string;
}

export interface Credentials {
  achievements: Achievement[];
  education: EducationEntry[];
  programs: Program[];
  courses: Course[];
}
