from fastapi import APIRouter

from .. import data
from ..models import Profile, Credentials

router = APIRouter(prefix="/api", tags=["profile"])


@router.get("/profile", response_model=Profile)
def get_profile():
    return data.PROFILE


@router.get("/credentials", response_model=Credentials)
def get_credentials():
    return {
        "achievements": data.ACHIEVEMENTS,
        "education": data.EDUCATION,
        "programs": data.PROGRAMS,
        "courses": data.COURSES,
    }
