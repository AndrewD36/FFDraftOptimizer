from dataclasses import dataclass, field
from typing import Dict, List, Optional
import copy
from app.models.position_model import Position
from app.models.player_model import Player

@dataclass(frozen=True)
class DraftAction:
    """
    Abstract action.

    The MCCFR engine chooses one of these.
    Then we map it to a real player.
    """
    name: str
    position: Optional[Position] = None

@dataclass
class TeamRoster:
    team_id: int
    players: List[Player] = field(default_factory=list)

    def add_player(self, player: Player) -> None:
        self.players.append(player)

    def count_position(self, position: Position) -> int:
        return sum(1 for p in self.players if p.position == position)

    def total_projected_points(self) -> float:
        return sum(p.projected_points for p in self.players)

    def roster_needs(self) -> Dict[Position, int]:
        """
        Basic roster requirements.

        Example:
        QB: 1
        RB: 2
        WR: 2
        TE: 1
        FLEX: ignored in this simple first version
        DEF: 1
        K: 1

        You will make this more advanced later.
        """
        required = {
            Position.QB: 1,
            Position.RB: 2,
            Position.WR: 2,
            Position.TE: 1,
            Position.DEF: 1,
            Position.K: 1,
        }

        needs = {}
        for pos, req_count in required.items():
            current = self.count_position(pos)
            needs[pos] = max(0, req_count - current)

        return needs

@dataclass
class DraftState:
    """
    Represents the current draft.

    pick_index is zero-based.
    Example:
        pick_index = 0 means first overall pick.
        pick_index = 1 means second overall pick.
    """
    teams: List[TeamRoster]
    available_players: List[Player]
    pick_order: List[int]
    pick_index: int = 0

    def clone(self) -> "DraftState":
        return copy.deepcopy(self)

    def is_terminal(self) -> bool:
        return self.pick_index >= len(self.pick_order)

    def current_team_id(self) -> int:
        return self.pick_order[self.pick_index]

    def draft_player(self, player: Player) -> None:
        team_id = self.current_team_id()
        self.teams[team_id].add_player(player)
        self.available_players = [
            p for p in self.available_players
            if p.player_id != player.player_id
        ]
        self.pick_index += 1

    def picks_until_team_next_pick(self, team_id: int) -> int:
        for future_index in range(self.pick_index + 1, len(self.pick_order)):
            if self.pick_order[future_index] == team_id:
                return future_index - self.pick_index
        return 999
    
