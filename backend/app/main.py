import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import books, profile, contact

app = FastAPI(
    title="Vismaya M — Portfolio API",
    description="Serves project case files, experience, and credentials to the Next.js frontend.",
    version="1.0.0",
)

# In production, set ALLOWED_ORIGINS to your deployed frontend URL(s),
# comma-separated, e.g. "https://vismaya.dev,https://vismaya.vercel.app"
_default_origins = "http://localhost:3000,http://127.0.0.1:3000"
origins = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", _default_origins).split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books.router)
app.include_router(profile.router)
app.include_router(contact.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
