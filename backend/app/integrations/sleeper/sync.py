from __future__ import annotations

from datetime import datetime

from app.integrations.sleeper.client import SleeperClient
from app.integrations.sleeper.mappers import (
    build_internal_draft_state,
    build_team_rows,
    map_sleeper_league_option,
    map_sleeper_user,
)
from app.repos.draft_repo import DraftRepository
from app.repos.league_repo import LeagueRepository


class SleeperSyncService:
    def __init__(
        self,
        client: SleeperClient,
        league_repo: LeagueRepository,
        draft_repo: DraftRepository,
    ) -> None:
        self.client = client
        self.league_repo = league_repo
        self.draft_repo = draft_repo

    def search_user_and_leagues(self, query: str, season: str) -> dict:
        raw_user = self.client.get_user(query)
        user = map_sleeper_user(raw_user)

        raw_leagues = self.client.get_user_leagues(user["external_user_id"], season)
        leagues = [map_sleeper_league_option(lg) for lg in raw_leagues]

        return {
            "user": user,
            "leagues": leagues,
        }

    def import_league(self, external_user_id: str, external_league_id: str) -> dict:
        raw_league = self.client.get_league(external_league_id)
        raw_users = self.client.get_league_users(external_league_id)
        raw_rosters = self.client.get_league_rosters(external_league_id)
        raw_drafts = self.client.get_league_drafts(external_league_id)

        teams = build_team_rows(raw_users, raw_rosters)

        chosen_draft_id = raw_league.get("draft_id")
        if not chosen_draft_id and raw_drafts:
            chosen_draft_id = raw_drafts[0].get("draft_id")

        imported_draft = None
        if chosen_draft_id:
            raw_draft = self.client.get_draft(chosen_draft_id)
            raw_picks = self.client.get_draft_picks(chosen_draft_id)
            imported_draft = self.draft_repo.create(
                {
                    "external_draft_id": chosen_draft_id,
                    "external_league_id": external_league_id,
                    "snapshot": build_internal_draft_state(raw_draft, raw_picks),
                    "last_synced_at": datetime.utcnow().isoformat(),
                }
            )

        imported_league = self.league_repo.create(
            {
                "external_user_id": external_user_id,
                "external_league_id": external_league_id,
                "name": raw_league.get("name", "Unnamed League"),
                "season": str(raw_league.get("season", "")),
                "status": raw_league.get("status", "unknown"),
                "external_draft_id": chosen_draft_id,
                "total_rosters": raw_league.get("total_rosters"),
                "avatar": raw_league.get("avatar"),
                "teams": teams,
            }
        )

        return {
            "league": imported_league,
            "teams": teams,
            "imported_draft": imported_draft,
        }

    def sync_draft(self, local_draft_id: str) -> dict:
        stored = self.draft_repo.get(local_draft_id)
        if not stored:
            raise ValueError("Imported draft not found.")

        external_draft_id = stored["external_draft_id"]
        raw_draft = self.client.get_draft(external_draft_id)
        raw_picks = self.client.get_draft_picks(external_draft_id)

        snapshot = build_internal_draft_state(raw_draft, raw_picks)

        updated = self.draft_repo.update(
            local_draft_id,
            {
                "snapshot": snapshot,
                "last_synced_at": datetime.utcnow().isoformat(),
            },
        )
        return updated