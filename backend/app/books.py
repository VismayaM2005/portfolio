"""
Normalizes PROJECTS and EXPERIENCE (backend/app/data.py) into a single list
of "books" with a consistent chapter structure, computed once at import time.

Projects get five chapters (Premise / Build / Plot Twist / Resolution /
Author's Notes) since there's enough real material -- role, what worked,
limitations, metrics -- to fill each one honestly.

Internships get three (Premise / The Work / Author's Notes): the source
material is a flat list of achievements rather than separately documented
obstacles, so padding it out to five chapters would mean inventing content.
A shorter book with real chapters beats a padded one with filler.

Read time and chapter count are computed from the actual text, not
hand-picked -- they're real numbers, matching the "no invented stats" rule
the site follows throughout.
"""
import re

WORDS_PER_MINUTE = 185


def _word_count(*texts):
    total = 0
    for t in texts:
        if not t:
            continue
        total += len(re.findall(r"\S+", t))
    return total


def _read_minutes(word_count):
    return max(2, round(word_count / WORDS_PER_MINUTE))


def _project_chapters(p):
    chapters = []
    hooks = p["chapterHooks"]

    chapters.append({
        "title": "The Premise",
        "hook": hooks["premise"],
        "body": [p["summary"]],
        "bullets": [],
        "metrics": [],
    })

    build_body = [p["role"]]
    build_bullets = []
    if p.get("teammates"):
        build_bullets.append(p["teammates"])
    chapters.append({
        "title": "The Build",
        "hook": hooks["build"],
        "body": build_body,
        "bullets": build_bullets,
        "metrics": [],
    })

    twist_bullets = p["limitations"] if p["limitations"] else []
    twist_body = [] if twist_bullets else ["No major obstacles worth flagging here -- this one went smoothly."]
    chapters.append({
        "title": "The Plot Twist",
        "hook": hooks["twist"],
        "body": twist_body,
        "bullets": twist_bullets,
        "metrics": [],
    })

    chapters.append({
        "title": "The Resolution",
        "hook": hooks["resolution"],
        "body": [],
        "bullets": p["whatWorked"],
        "metrics": p["metrics"],
    })

    notes_body = [p["note"]] if p.get("note") else []
    chapters.append({
        "title": "Author's Notes",
        "hook": hooks["notes"],
        "body": notes_body,
        "bullets": [],
        "metrics": [],
    })

    return chapters


def _experience_chapters(e):
    hooks = e["chapterHooks"]
    date_line = f"{e['start']} — {e['end'] or 'Present'}, {e['org']}"

    chapters = [
        {
            "title": "The Premise",
            "hook": hooks["premise"],
            "body": [e["blurb"], date_line],
            "bullets": [],
            "metrics": [],
        },
        {
            "title": "The Work",
            "hook": hooks["build"],
            "body": [],
            "bullets": e["points"],
            "metrics": [],
        },
        {
            "title": "Author's Notes",
            "hook": hooks["notes"],
            "body": [],
            "bullets": [],
            "metrics": [],
        },
    ]
    return chapters


def _project_to_book(p):
    chapters = _project_chapters(p)
    wc = _word_count(
        p["summary"], p["role"], p.get("teammates"), p.get("note"),
        *p["whatWorked"], *p["limitations"],
        *[qa["q"] + " " + qa["a"] for qa in p["qa"]],
    )
    return {
        "slug": p["slug"],
        "kind": "project",
        "title": p["title"],
        "subtitle": p["subtitle"],
        "genre": p["genre"],
        "tags": p.get("tags", []),
        "domains": p["domains"],
        "storyStatus": p["storyStatus"],
        "coverType": p["coverType"],
        "coverImage": p.get("coverImage"),
        "coverPattern": p.get("coverPattern"),
        "blurb": p["blurb"],
        "status": p["status"],
        "team": p["team"],
        "featured": p["featured"],
        "techStack": p["techStack"],
        "qa": p["qa"],
        "repoUrl": p.get("repoUrl"),
        "chapters": chapters,
        "chapterCount": len(chapters),
        "readMinutes": _read_minutes(wc),
    }


def _experience_to_book(e):
    chapters = _experience_chapters(e)
    wc = _word_count(e["blurb"], *e["points"])
    return {
        "slug": e["id"],
        "kind": "internship",
        "title": e["title"],
        "subtitle": e["subtitle"],
        "genre": e["genre"],
        "tags": e.get("tags", []),
        "domains": e["domains"],
        "storyStatus": e["storyStatus"],
        "coverType": e["coverType"],
        "coverImage": e.get("coverImage"),
        "coverPattern": e.get("coverPattern"),
        "blurb": e["blurb"],
        "status": [e["role"], e["org"]],
        "team": e["org"],
        "featured": e["storyStatus"] == "ongoing",
        "techStack": [],
        "qa": [],
        "repoUrl": None,
        "chapters": chapters,
        "chapterCount": len(chapters),
        "readMinutes": _read_minutes(wc),
    }


def build_books(projects, experience):
    books = [_project_to_book(p) for p in projects] + [_experience_to_book(e) for e in experience]
    return books
