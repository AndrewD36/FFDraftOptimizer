from __future__ import annotations

from typing import Any
import requests


class SleeperAPIError(Exception):
    pass


class SleeperNotFoundError(SleeperAPIError):
    pass


class SleeperClient:
    BASE_URL = "https://api.sleeper.app/v1"

    def __init__(self, timeout: int = 15) -> None:
        self.timeout = timeout
        self.session = requests.Session()

    def _get(self, path: str) -> Any:
        url = f"{self.BASE_URL}{path}"
        try:
            response = self.session.get(url, timeout=self.timeout)
        except requests.RequestException as exc:
            raise SleeperAPIError(f"Request to Sleeper failed: {exc}") from exc

        if response.status_code == 404:
            raise SleeperNotFoundError(f"Sleeper resource not found: {path}")

        try:
            response.raise_for_status()
        except requests.HTTPError as exc:
            raise SleeperAPIError(
                f"Sleeper returned {response.status_code} for {path}"
            ) from exc

        return response.json()

    def get_user(self, username_or_user_id: str) -> dict[str, Any]:
        return self._get(f"/user/{username_or_user_id}")

    def get_user_leagues(self, user_id: str, season: str) -> list[dict[str, Any]]:
        return self._get(f"/user/{user_id}/leagues/nfl/{season}")

    def get_league(self, league_id: str) -> dict[str, Any]:
        return self._get(f"/league/{league_id}")

    def get_league_users(self, league_id: str) -> list[dict[str, Any]]:
        return self._get(f"/league/{league_id}/users")

    def get_league_rosters(self, league_id: str) -> list[dict[str, Any]]:
        return self._get(f"/league/{league_id}/rosters")

    def get_league_drafts(self, league_id: str) -> list[dict[str, Any]]:
        return self._get(f"/league/{league_id}/drafts")

    def get_draft(self, draft_id: str) -> dict[str, Any]:
        return self._get(f"/draft/{draft_id}")

    def get_draft_picks(self, draft_id: str) -> list[dict[str, Any]]:
        return self._get(f"/draft/{draft_id}/picks")