import type { DraftRecommendation } from "@/lib/types/recommendation";

export const mockRecommendations: DraftRecommendation[] = [
  {
    playerId: "p1",
    playerName: "Ja'Marr Chase",
    position: "WR",
    score: 97.4,
    reason:
      "Elite projection, strong roster fit, and large tier advantage over remaining wide receivers.",
  },
  {
    playerId: "p2",
    playerName: "Bijan Robinson",
    position: "RB",
    score: 94.8,
    reason:
      "High projected volume and strong positional value compared with remaining running backs.",
  },
  {
    playerId: "p4",
    playerName: "Josh Allen",
    position: "QB",
    score: 88.1,
    reason:
      "Elite quarterback advantage, but lower immediate roster need compared with RB/WR targets.",
  },
];