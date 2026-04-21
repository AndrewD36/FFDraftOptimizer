import json
from pathlib import Path

import requests

SLEEPER_PLAYERS_URL = "https://api.sleeper.app/v1/players/nfl"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "players.json"


def normalize_players(raw_data: dict) -> list[dict]:
    players = []

    for player_id, player in raw_data.items():
        position = player.get("position")
        full_name = player.get("full_name")
        team = player.get("team")

        # Skip junk / unusable entries
        if not position or not full_name:
            continue

        players.append(
            {
                "id": str(player_id),
                "name": full_name,
                "position": position,
                "team": team,
            }
        )

    # Optional: stable sort for debugging / deterministic behavior
    players.sort(key=lambda p: (p["position"], p["name"]))
    return players


def fetch_players() -> None:
    print("Fetching players from Sleeper...")
    response = requests.get(SLEEPER_PLAYERS_URL, timeout=30)
    response.raise_for_status()

    raw_data = response.json()
    normalized_players = normalize_players(raw_data)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(normalized_players, f, indent=2)

    print(f"Saved {len(normalized_players)} players to {OUTPUT_PATH}")


if __name__ == "__main__":
    fetch_players()