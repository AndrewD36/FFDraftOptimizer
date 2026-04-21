from pydantic import BaseModel


class CreateDraftRequest(BaseModel):
    name: str
    num_teams: int = 12


class MakePickRequest(BaseModel):
    player_id: str