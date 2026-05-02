from app.services.player_pool import PlayerPoolService
from app.integrations.sleeper.client import SleeperClient
from app.integrations.sleeper.sync import SleeperSyncService
from app.repos.draft_repo import DraftRepository
from app.repos.league_repo import LeagueRepository

player_pool_service = PlayerPoolService()
sleeper_client = SleeperClient()
league_repo = LeagueRepository()
draft_repo = DraftRepository()

sleeper_sync_service = SleeperSyncService(
    client=sleeper_client,
    league_repo=league_repo,
    draft_repo=draft_repo,
)