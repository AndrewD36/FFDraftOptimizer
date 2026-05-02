export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DEF";

export type Player = {
  id: string;
  fullName: string;
  position: Position;
  nflTeam: string | null;
  projectedPoints: number;
  adp: number;
  tier: number;
};