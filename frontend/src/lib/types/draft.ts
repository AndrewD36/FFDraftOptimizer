import type { Player } from "./player";
import type { DraftRecommendation } from "./recommendation";
import type { SleeperLeague } from "./league";

export type DraftMode = "mock" | "live";

export type DraftStatus = "pre_draft" | "drafting" | "complete";

export type DraftPick = {
  pickNumber: number;
  round: number;
  rosterId: number;
  player: Player;
};

export type TeamRoster = {
  rosterId: number;
  teamName: string;
  picks: DraftPick[];
};

export type DraftRoomState = {
  mode: DraftMode;

  league?: SleeperLeague;

  draft: {
    draftId?: string;
    status: DraftStatus;
    currentPick: number;
    currentRound: number;
    currentRosterId?: number;
  };

  user?: {
    sleeperUserId: string;
    rosterId: number;
    teamName: string;
  };

  picks: DraftPick[];
  rosters: TeamRoster[];
  availablePlayers: Player[];
  recommendations: DraftRecommendation[];
};