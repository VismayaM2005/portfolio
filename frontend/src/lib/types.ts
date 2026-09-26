export interface Domain {
  id: string;
  label: string;
  short: string;
  color: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  penName: string;
  location: string;
  tagline: string;
  abstract: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  photoUrl: string;
  stats: Stat[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface QAItem {
  q: string;
  a: string;
}

export interface Chapter {
  title: string;
  hook: string;
  body: string[];
  bullets: string[];
  metrics: Metric[];
}

export type BookKind = 'project' | 'internship';
export type StoryStatus = 'ongoing' | 'completed';
export type CoverType = 'photo' | 'illustration';

export interface BookSummary {
  slug: string;
  kind: BookKind;
  title: string;
  subtitle: string;
  genre: string;
  tags: string[];
  domains: string[];
  storyStatus: StoryStatus;
  coverType: CoverType;
  coverImage?: string | null;
  coverPattern?: string | null;
  blurb: string;
  featured: boolean;
  chapterCount: number;
  readMinutes: number;
}

export interface Book extends BookSummary {
  status: string[];
  team: string;
  techStack: string[];
  qa: QAItem[];
  repoUrl?: string | null;
  chapters: Chapter[];
}

export interface Genre {
  name: string;
  count: number;
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
