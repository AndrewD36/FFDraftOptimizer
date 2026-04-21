from backend.app.models.draft_model import DraftPick, DraftState, TeamRoster


class DraftEngine:
    def create_draft(self, draft_id: str, name: str, num_teams: int) -> DraftState:
        rosters = [TeamRoster(roster_id=i) for i in range(1, num_teams + 1)]

        return DraftState(
            id=draft_id,
            name=name,
            num_teams=num_teams,
            current_pick=1,
            current_round=1,
            current_roster_id=1,
            picks=[],
            rosters=rosters,
        )

    def get_drafted_player_ids(self, draft: DraftState) -> set[str]:
        return {pick.player_id for pick in draft.picks}

    def make_pick(self, draft: DraftState, player_id: str) -> DraftState:
        drafted_ids = self.get_drafted_player_ids(draft)
        if player_id in drafted_ids:
            raise ValueError("Player has already been drafted.")

        pick = DraftPick(
            pick_number=draft.current_pick,
            round_number=draft.current_round,
            roster_id=draft.current_roster_id,
            player_id=player_id,
        )
        draft.picks.append(pick)

        roster = next(r for r in draft.rosters if r.roster_id == draft.current_roster_id)
        roster.player_ids.append(player_id)

        self._advance_turn(draft)
        return draft

    def _advance_turn(self, draft: DraftState) -> None:
        num_teams = draft.num_teams
        current_pick = draft.current_pick + 1

        current_round = ((current_pick - 1) // num_teams) + 1
        pick_in_round = ((current_pick - 1) % num_teams) + 1

        if current_round % 2 == 1:
            current_roster_id = pick_in_round
        else:
            current_roster_id = num_teams - pick_in_round + 1

        draft.current_pick = current_pick
        draft.current_round = current_round
        draft.current_roster_id = current_roster_id