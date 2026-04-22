from pydantic import BaseModel, Field
from typing import Dict, List

class TeamRoster(BaseModel):
    roster_id: int
    player_ids: list[str] = Field(default_factory=list)
    roster_limits: dict[str, int]
    # starters: dict[str, list[DraftPick]] = Field(default_factory=dict)
    # bench: list[DraftPick] = Field(default_factory=list)

    def __init__(self):
        self.roster_slots = {"QB": 1, "RB": 2, "WR": 2, "TE": 1, "FLEX": 2, "DEF": 1, "K": 1, "BN": 6}   #TODO: Change to consume from sleeper api endpoint
        self.current_roster = {"QB": 0, "RB": 0, "WR": 0, "TE": 0, "FLEX": 0, "DEF": 0, "K": 0, "BN": 0}

    def isRosterFull(self):
        return True if sum(self.current_roster.values()) == sum(self.roster_slots.values()) else False

    def addPlayer(self):
        pass