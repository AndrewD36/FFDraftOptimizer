import type { Player } from "@/lib/types/player";

type RecommendationPanelProps = {
  players: Player[];
};

export function RecommendationPanel({ players }: RecommendationPanelProps) {
  const topProjectedPlayer = [...players].sort((a, b) => {
    return b.projectedPoints - a.projectedPoints;
  })[0];

  const bestAdpValue = [...players].sort((a, b) => {
    return a.adp - b.adp;
  })[0];

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Recommendations</h2>

      <div className="mt-4 space-y-3">
        {players.length === 0 ? (
          <p className="text-sm text-gray-500">No players remaining.</p>
        ) : (
          <>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium text-gray-500">
                Highest Projection
              </p>
              <p className="font-semibold">{topProjectedPlayer.fullName}</p>
              <p className="text-sm text-gray-500">
                {topProjectedPlayer.position} ·{" "}
                {topProjectedPlayer.projectedPoints} pts
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium text-gray-500">
                Best ADP Value
              </p>
              <p className="font-semibold">{bestAdpValue.fullName}</p>
              <p className="text-sm text-gray-500">
                {bestAdpValue.position} · ADP {bestAdpValue.adp}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}