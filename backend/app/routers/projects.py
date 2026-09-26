from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query

from .. import data
from ..models import Project, ProjectSummary, Domain

router = APIRouter(prefix="/api", tags=["projects"])


@router.get("/domains", response_model=List[Domain])
def list_domains():
    return data.DOMAINS


@router.get("/projects", response_model=List[ProjectSummary])
def list_projects(domain: Optional[str] = Query(default=None, description="Filter by domain id, e.g. 'ai'")):
    projects = data.PROJECTS
    if domain:
        projects = [p for p in projects if domain in p["domains"]]
    return projects


@router.get("/projects/{slug}", response_model=Project)
def get_project(slug: str):
    for p in data.PROJECTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail=f"No project with slug '{slug}'")
