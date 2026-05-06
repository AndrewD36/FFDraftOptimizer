from dataclasses import dataclass
from position_model import Position


@dataclass(frozen=True)
class Player:
    player_id: str
    name: str
    position: Position
    projected_points: float
    adp: float
    tier: int