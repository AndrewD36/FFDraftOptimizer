from __future__ import annotations

from typing import Any
from uuid import uuid4


class LeagueRepository:
    def __init__(self) -> None:
        self._store: dict[str, dict[str, Any]] = {}

    def create(self, payload: dict[str, Any]) -> dict[str, Any]:
        local_id = str(uuid4())
        record = {"id": local_id, **payload}
        self._store[local_id] = record
        return record

    def get(self, local_id: str) -> dict[str, Any] | None:
        return self._store.get(local_id)

    def list_all(self) -> list[dict[str, Any]]:
        return list(self._store.values())