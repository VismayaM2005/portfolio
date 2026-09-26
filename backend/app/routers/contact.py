import json
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter

from ..models import ContactMessage, ContactMessageOut

router = APIRouter(prefix="/api", tags=["contact"])

# Messages are appended to a local JSON-lines file. This is a deliberately
# simple store for a portfolio site -- swap this out for a real email
# provider (e.g. Resend, SES) or a database once you have credentials for one.
STORE_PATH = Path(__file__).resolve().parent.parent.parent / "contact_messages.jsonl"


@router.post("/contact", response_model=ContactMessageOut)
def submit_contact(msg: ContactMessage):
    received_at = datetime.now(timezone.utc).isoformat()
    record = {**msg.model_dump(), "receivedAt": received_at}
    with STORE_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")
    return {"ok": True, "receivedAt": received_at}
