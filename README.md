# Vismaya M — Portfolio

An "engineering case-file" portfolio: a Next.js frontend backed by a real FastAPI service,
not a static page. Each project is presented like a technical case file — role, what
worked, honest limitations, verified metrics, and an expandable "ask about this project"
Q&A pulled from real interview prep — and the homepage's node-graph lets you explore
projects by domain (AI/ML, Computer Vision, IoT & Embedded, Backend & Systems).

```
backend/    FastAPI service — all content lives in backend/app/data.py
frontend/   Next.js (App Router, TypeScript) — fetches from the backend API
```

## Running locally

You need both processes running at once (two terminals).

**1. Backend**

```bash
cd backend
python -m venv .venv
./.venv/Scripts/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload   # http://localhost:8000
```

**2. Frontend**

```bash
cd frontend
npm install
npm run dev                     # http://localhost:3000
```

The frontend reads the backend URL from `frontend/.env.local` (`NEXT_PUBLIC_API_URL`,
defaults to `http://localhost:8000`).

## Editing content

**Everything you'd want to change — project descriptions, metrics, experience, education,
achievements — lives in one file: `backend/app/data.py`.** It's plain Python data
(lists of dicts), validated against the Pydantic schemas in `backend/app/models.py` on
every request. There's no database and no CMS to wire up; edit the file, save, and the
running `uvicorn --reload` process picks it up immediately.

To add a project's live repo link once it's public, set its `"repoUrl"` field in
`data.py` (currently `None` for all projects, which renders as "Private / not published").

## Contact form

`POST /api/contact` currently appends submissions to `backend/contact_messages.jsonl`
(gitignored) — it does **not** send an email yet, since that needs a real provider and
credentials only you can supply. To wire up actual email delivery, the cleanest options
are:

- **Resend** (resend.com) — a few lines in `backend/app/routers/contact.py`, needs an API key.
- **AWS SES** — already have AWS familiarity from the Kazunov1AI internship, so this fits your stack.

Either way: get an API key, add it as an environment variable (`RESEND_API_KEY` or AWS
credentials), and send the email inside `submit_contact()` alongside (or instead of) the
JSONL write.

## Deploying

This is a two-service app, so it needs two deployments:

- **Frontend → Vercel.** Import the repo, set the root directory to `frontend`, and add
  an environment variable `NEXT_PUBLIC_API_URL` pointing at your deployed backend URL.
- **Backend → Render or Fly.io.** Point it at the `backend` directory, build command
  `pip install -r requirements.txt`, start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
  Set an `ALLOWED_ORIGINS` environment variable to your Vercel URL(s) (comma-separated)
  so CORS allows the deployed frontend to call it.

## Where the content came from

Sourced from the FlowCV resume (2026-09-22), LinkedIn project exports, and two
interview-prep documents. Where those documents corrected a resume claim against the
actual code (e.g. AURA's routing is a greedy algorithm, not A*), the corrected version
is what's published here.
