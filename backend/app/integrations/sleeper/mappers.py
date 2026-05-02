from __future__ import annotations

from typing import Any


def map_sleeper_user(raw_user: dict[str, Any]) -> dict[str, Any]:
    return {
        "external_user_id": raw_user["user_id"],
        "username": raw_user.get("username"),
        "display_name": raw_user.get("display_name"),
        "avatar": raw_user.get("avatar"),
    }


def map_sleeper_league_option(raw_league: dict[str, Any]) -> dict[str, Any]:
    return {
        "external_league_id": raw_league["league_id"],
        "name": raw_league.get("name", "Unnamed League"),
        "season": str(raw_league.get("season", "")),
        "status": raw_league.get("status", "unknown"),
        "draft_id": raw_league.get("draft_id"),
        "avatar": raw_league.get("avatar"),
        "total_rosters": raw_league.get("total_rosters"),
    }


def build_team_rows(
    raw_users: list[dict[str, Any]],
    raw_rosters: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    users_by_id = {u["user_id"]: u for u in raw_users}
    teams: list[dict[str, Any]] = []

    for roster in raw_rosters:
        owner_id = roster.get("owner_id")
        owner = users_by_id.get(owner_id, {})

        team_name = None
        metadata = owner.get("metadata") or {}
        if isinstance(metadata, dict):
            team_name = metadata.get("team_name")

        teams.append(
            {
                "roster_id": roster["roster_id"],
                "owner_external_user_id": owner_id,
                "username": owner.get("username"),
                "display_name": owner.get("display_name"),
                "team_name": team_name,
                "player_ids": roster.get("players") or [],
            }
        )

    teams.sort(key=lambda x: x["roster_id"])
    return teams


def build_internal_draft_state(
    raw_draft: dict[str, Any],
    raw_picks: list[dict[str, Any]],
) -> dict[str, Any]:
    # First version: keep a normalized snapshot, not your final full domain model.
    picks = sorted(raw_picks, key=lambda x: x.get("pick_no", 0))

    return {
        "external_draft_id": raw_draft["draft_id"],
        "status": raw_draft.get("status"),
        "type": raw_draft.get("type"),
        "teams": raw_draft.get("settings", {}).get("teams"),
        "rounds": raw_draft.get("settings", {}).get("rounds"),
        "slot_to_roster_id": raw_draft.get("slot_to_roster_id") or {},
        "draft_order": raw_draft.get("draft_order") or {},
        "pick_count": len(picks),
        "picks": [
            {
                "pick_no": pick.get("pick_no"),
                "round": pick.get("round"),
                "roster_id": pick.get("roster_id"),
                "picked_by": pick.get("picked_by"),
                "draft_slot": pick.get("draft_slot"),
                "player_id": pick.get("player_id"),
                "metadata": pick.get("metadata") or {},
            }
            for pick in picks
        ],
    }