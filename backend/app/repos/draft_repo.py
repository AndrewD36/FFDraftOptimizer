from __future__ import annotations

from typing import Any
from uuid import uuid4


class DraftRepository:
    def __init__(self) -> None:
        self._store: dict[str, dict[str, Any]] = {}

    def create(self, payload: dict[str, Any]) -> dict[str, Any]:
        local_id = str(uuid4())
        record = {"id": local_id, **payload}
        self._store[local_id] = record
        return record

    def update(self, local_id: str, payload: dict[str, Any]) -> dict[str, Any]:
        record = self._store[local_id]
        record.update(payload)
        self._store[local_id] = record
        return record

    def get(self, local_id: str) -> dict[str, Any] | None:
        return self._store.get(local_id)

    def find_by_external_draft_id(self, external_draft_id: str) -> dict[str, Any] | None:
        for draft in self._store.values():
            if draft.get("external_draft_id") == external_draft_id:
                return draft
        return None