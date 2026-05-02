import type { Player } from "./player";

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

export type DraftState = {
  draftId: string;
  currentPick: number;
  userRosterId: number;
  picks: DraftPick[];
  rosters: TeamRoster[];
  availablePlayers: Player[];
};