import json
from pathlib import Path
from backend.app.models.player_model import Player

PLAYERS_PATH = Path(__file__).resolve().parent.parent / "data" / "players.json"

class PlayerPoolService:
    def __init__(self):
        self._players: list[Player] = []
        self._players_by_id: dict[str, Player] = {}

    def load_players(self) -> None:
        if not PLAYERS_PATH.exists():
            raise FileNotFoundError(
                f"Player data not found at {PLAYERS_PATH}. Run fetch_players.py first."
            )

        with open(PLAYERS_PATH, "r", encoding="utf-8") as f:
            raw_players = json.load(f)

        self._players = [Player(**p) for p in raw_players]
        self._players_by_id = {player.id: player for player in self._players}

    def get_all_players(self) -> list[Player]:
        return self._players

    def get_player_by_id(self, player_id: str) -> Player | None:
        return self._players_by_id.get(player_id)

    def get_available_players(self, drafted_player_ids: set[str]) -> list[Player]:
        return [player for player in self._players if player.id not in drafted_player_ids]