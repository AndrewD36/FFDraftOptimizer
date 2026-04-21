from pydantic import BaseModel, Field
from typing import Dict, List

class DraftPick(BaseModel):
    pick_number: int
    round_number: int
    roster_id: int
    player_id: str
    name: str
    position: str
    team: str



class TeamRoster(BaseModel):
    roster_id: int
    player_ids: list[str] = Field(default_factory=list)
    roster_limits: dict[str, int]
    starters: dict[str, list[DraftPick]] = Field(default_factory=dict)
    bench: list[DraftPick] = Field(default_factory=list)

    def __post_init__(self):
        pass


class DraftState(BaseModel):
    id: str
    name: str
    num_teams: int
    current_pick: int = 1
    current_round: int = 1
    current_roster_id: int = 1
    picks: list[DraftPick] = Field(default_factory=list)
    rosters: list[TeamRoster] = Field(default_factory=list)