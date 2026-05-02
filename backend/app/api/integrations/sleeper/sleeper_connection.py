from __future__ import annotations

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query

from app.core.dependencies import sleeper_sync_service
from app.schemas.sleeper import (
    ImportedLeagueResponse,
    ImportedLeagueSummaryResponse,
    ImportedTeamResponse,
    SleeperImportLeagueRequest,
    SleeperSearchUserRequest,
    SleeperSearchUserResponse,
    SleeperLeagueOptionResponse,
    SleeperUserResponse,
)

router = APIRouter(prefix="/integrations/sleeper", tags=["sleeper"])


@router.post("/search-user", response_model=SleeperSearchUserResponse)
def search_sleeper_user(
    req: SleeperSearchUserRequest,
    season: str | None = Query(default=None),
):
    """
    Step 1 for your UI:
    user types username/user_id -> return user + leagues for popup.
    """
    target_season = season or str(datetime.utcnow().year)

    try:
        result = sleeper_sync_service.search_user_and_leagues(
            query=req.query,
            season=target_season,
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return SleeperSearchUserResponse(
        user=SleeperUserResponse(**result["user"]),
        leagues=[SleeperLeagueOptionResponse(**lg) for lg in result["leagues"]],
    )


@router.post("/import-league", response_model=ImportedLeagueResponse)
def import_sleeper_league(req: SleeperImportLeagueRequest):
    """
    Step 2 for your UI:
    user selects league in popup -> import full league into your app.
    """
    try:
        result = sleeper_sync_service.import_league(
            external_user_id=req.external_user_id,
            external_league_id=req.external_league_id,
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    league = result["league"]
    teams = result["teams"]
    imported_draft = result["imported_draft"]

    return ImportedLeagueResponse(
        league=ImportedLeagueSummaryResponse(
            local_league_id=league["id"],
            external_league_id=league["external_league_id"],
            name=league["name"],
            season=league["season"],
            status=league["status"],
            external_draft_id=league.get("external_draft_id"),
            total_rosters=league.get("total_rosters"),
        ),
        teams=[ImportedTeamResponse(**team) for team in teams],
        imported_draft_id=imported_draft["id"] if imported_draft else None,
    )