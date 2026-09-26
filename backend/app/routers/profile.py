from typing import List
from fastapi import APIRouter

from .. import data
from ..models import Profile, ExperienceEntry, Credentials

router = APIRouter(prefix="/api", tags=["profile"])


@router.get("/profile", response_model=Profile)
def get_profile():
    return data.PROFILE


@router.get("/experience", response_model=List[ExperienceEntry])
def get_experience():
    return data.EXPERIENCE


@router.get("/credentials", response_model=Credentials)
def get_credentials():
    return {
        "achievements": data.ACHIEVEMENTS,
        "education": data.EDUCATION,
        "programs": data.PROGRAMS,
        "courses": data.COURSES,
    }
