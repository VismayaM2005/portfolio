from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


class Domain(BaseModel):
    id: str
    label: str
    short: str
    color: str
    description: str


class Stat(BaseModel):
    label: str
    value: str


class Capability(BaseModel):
    domain: str
    level: int


class Profile(BaseModel):
    name: str
    location: str
    tagline: str
    abstract: str
    email: str
    phone: str
    linkedin: str
    github: str
    resumeUrl: str
    stats: List[Stat]
    capabilities: List[Capability]


class Metric(BaseModel):
    label: str
    value: str


class QAItem(BaseModel):
    q: str
    a: str


class Project(BaseModel):
    slug: str
    title: str
    subtitle: str
    domains: List[str]
    status: List[str]
    team: str
    featured: bool
    summary: str
    role: str
    teammates: Optional[str] = None
    whatWorked: List[str] = []
    limitations: List[str] = []
    metrics: List[Metric] = []
    techStack: List[str] = []
    qa: List[QAItem] = []
    note: Optional[str] = None
    repoUrl: Optional[str] = None


class ProjectSummary(BaseModel):
    slug: str
    title: str
    subtitle: str
    domains: List[str]
    status: List[str]
    summary: str
    featured: bool


class ExperienceEntry(BaseModel):
    id: str
    role: str
    org: str
    start: str
    end: Optional[str] = None
    status: str
    points: List[str]


class Achievement(BaseModel):
    title: str
    detail: str


class EducationEntry(BaseModel):
    school: str
    degree: str
    period: str
    score: str


class Program(BaseModel):
    title: str
    org: str
    detail: str


class Course(BaseModel):
    title: str
    org: str


class Credentials(BaseModel):
    achievements: List[Achievement]
    education: List[EducationEntry]
    programs: List[Program]
    courses: List[Course]


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


class ContactMessageOut(BaseModel):
    ok: bool
    receivedAt: str
