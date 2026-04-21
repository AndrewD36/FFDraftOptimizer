from __future__ import annotations
from pathlib import Path
import json
import requests
from typing import Any


BASE_URL = "https://api.sleeper.app/v1"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "league.json"


def get_user(username_or_user_id: str) -> dict[str, Any]:
    """
    Fetch a Sleeper user object by username or user_id.
    """
    url = f"{BASE_URL}/user/{username_or_user_id}"
    response = requests.get(url, timeout=30)
    response.raise_for_status()

    data = response.json()
    if not isinstance(data, dict):
        raise ValueError(f"Expected a user object, got: {type(data).__name__}")

    return data


def get_user_leagues(user_id: str, sport: str, season: int | str) -> list[dict[str, Any]]:
    """
    Fetch all leagues for a Sleeper user for a given sport and season.
    """
    url = f"{BASE_URL}/user/{user_id}/leagues/{sport}/{season}"
    response = requests.get(url, timeout=30)
    response.raise_for_status()

    data = response.json()
    if not isinstance(data, list):
        raise ValueError(f"Expected a list of leagues, got: {type(data).__name__}")

    return data


if __name__ == "__main__":
    USERNAME = "DrGoneDirty"
    SPORT = "nfl"
    SEASON = 2025

    try:
        user = get_user(USERNAME)
        user_id = user["user_id"]

        print("Username:", user.get("username"))
        print("Display Name:", user.get("display_name"))
        print("User ID:", user_id)
        print()

        leagues = get_user_leagues(user_id, SPORT, SEASON)

        print(f"Found {len(leagues)} leagues\n")

        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(leagues, f, indent=2)

    except requests.HTTPError as e:
        print(f"HTTP error: {e}")
    except requests.RequestException as e:
        print(f"Request failed: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")