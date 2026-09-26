from collections import Counter
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query

from .. import data
from ..books import build_books
from ..models import Book, BookSummary, Domain, Genre

router = APIRouter(prefix="/api", tags=["books"])

BOOKS = build_books(data.PROJECTS, data.EXPERIENCE)


@router.get("/domains", response_model=List[Domain])
def list_domains():
    return data.DOMAINS


@router.get("/genres", response_model=List[Genre])
def list_genres():
    counts = Counter(b["genre"] for b in BOOKS)
    return [{"name": name, "count": count} for name, count in counts.most_common()]


@router.get("/books", response_model=List[BookSummary])
def list_books(
    domain: Optional[str] = Query(default=None, description="Filter by domain id, e.g. 'ai'"),
    genre: Optional[str] = Query(default=None, description="Filter by exact genre name"),
    kind: Optional[str] = Query(default=None, description="'project' or 'internship'"),
):
    books = BOOKS
    if domain:
        books = [b for b in books if domain in b["domains"]]
    if genre:
        books = [b for b in books if b["genre"] == genre]
    if kind:
        books = [b for b in books if b["kind"] == kind]
    return books


@router.get("/books/{slug}", response_model=Book)
def get_book(slug: str):
    for b in BOOKS:
        if b["slug"] == slug:
            return b
    raise HTTPException(status_code=404, detail=f"No book with slug '{slug}'")
