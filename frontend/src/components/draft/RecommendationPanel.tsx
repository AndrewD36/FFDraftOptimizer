import type { DraftRecommendation } from "@/lib/types/recommendation";

type RecommendationPanelProps = {
  recommendations: DraftRecommendation[];
  onPinPlayer: (playerId: string) => void;
  onComparePlayer: (playerId: string) => void;
};

export function RecommendationPanel({
  recommendations,
  onPinPlayer,
  onComparePlayer,
}: RecommendationPanelProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Optimizer Suggestions</h2>

      <p className="mt-1 text-sm text-gray-500">
        Suggested targets based on your roster, player value, and draft context.
      </p>

      <div className="mt-4 space-y-3">
        {recommendations.length === 0 ? (
          <p className="text-sm text-gray-500">
            No recommendations yet. Load a draft or simulate picks.
          </p>
        ) : (
          recommendations.map((recommendation, index) => (
            <div
              key={recommendation.playerId}
              className="rounded-lg border p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Target #{index + 1}
                  </p>

                  <p className="font-semibold">
                    {recommendation.playerName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {recommendation.position} · Score {recommendation.score}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onPinPlayer(recommendation.playerId)}
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    Pin
                  </button>

                  <button
                    onClick={() => onComparePlayer(recommendation.playerId)}
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    Compare
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {recommendation.reason}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}