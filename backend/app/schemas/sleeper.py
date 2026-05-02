from __future__ import annotations

from pydantic import BaseModel, Field


class SleeperSearchUserRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Sleeper username or user_id")


class SleeperUserResponse(BaseModel):
    external_user_id: str
    username: str | None = None
    display_name: str | None = None
    avatar: str | None = None


class SleeperLeagueOptionResponse(BaseModel):
    external_league_id: str
    name: str
    season: str
    status: str
    draft_id: str | None = None
    avatar: str | None = None
    total_rosters: int | None = None


class SleeperSearchUserResponse(BaseModel):
    user: SleeperUserResponse
    leagues: list[SleeperLeagueOptionResponse]


class SleeperImportLeagueRequest(BaseModel):
    external_user_id: str
    external_league_id: str


class ImportedLeagueSummaryResponse(BaseModel):
    local_league_id: str
    external_league_id: str
    name: str
    season: str
    status: str
    external_draft_id: str | None = None
    total_rosters: int | None = None


class ImportedTeamResponse(BaseModel):
    roster_id: int
    owner_external_user_id: str | None = None
    username: str | None = None
    display_name: str | None = None
    team_name: str | None = None
    player_ids: list[str] = []


class ImportedLeagueResponse(BaseModel):
    league: ImportedLeagueSummaryResponse
    teams: list[ImportedTeamResponse]
    imported_draft_id: str | None = None