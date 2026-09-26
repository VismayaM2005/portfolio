from typing import List, Optional, Literal
from pydantic import BaseModel, EmailStr, Field


class Domain(BaseModel):
    id: str
    label: str
    short: str
    color: str


class Stat(BaseModel):
    label: str
    value: str


class Profile(BaseModel):
    name: str
    penName: str
    location: str
    tagline: str
    abstract: str
    bio: str
    email: str
    phone: str
    linkedin: str
    github: str
    resumeUrl: str
    photoUrl: str
    stats: List[Stat]


class Metric(BaseModel):
    label: str
    value: str


class QAItem(BaseModel):
    q: str
    a: str


class Chapter(BaseModel):
    title: str
    hook: str
    body: List[str] = []
    bullets: List[str] = []
    metrics: List[Metric] = []


class BookSummary(BaseModel):
    slug: str
    kind: Literal["project", "internship"]
    title: str
    subtitle: str
    genre: str
    tags: List[str] = []
    domains: List[str]
    storyStatus: Literal["ongoing", "completed"]
    coverType: Literal["photo", "illustration"]
    coverImage: Optional[str] = None
    coverPattern: Optional[str] = None
    blurb: str
    featured: bool
    chapterCount: int
    readMinutes: int


class Book(BookSummary):
    status: List[str]
    team: str
    techStack: List[str] = []
    qa: List[QAItem] = []
    repoUrl: Optional[str] = None
    chapters: List[Chapter]


class Genre(BaseModel):
    name: str
    count: int


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
