from pydantic import BaseModel


class Player(BaseModel):
    id: str
    name: str
    position: str
    team: str | None = None