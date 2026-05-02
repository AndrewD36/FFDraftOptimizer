import type { DraftPick } from "@/lib/types/draft";
import type { Position } from "@/lib/types/player";

type TeamRosterPanelProps = {
  picks: DraftPick[];
};

const positions: Position[] = ["QB", "RB", "WR", "TE", "K", "DEF"];

export function TeamRosterPanel({ picks }: TeamRosterPanelProps) {
  return (
    <aside className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Your Roster</h2>

      <div className="mt-4 space-y-4">
        {positions.map((position) => {
          const playersAtPosition = picks.filter((pick) => {
            return pick.player.position === position;
          });

          return (
            <div key={position}>
              <h3 className="text-sm font-semibold text-gray-500">
                {position}
              </h3>

              <div className="mt-2 space-y-2">
                {playersAtPosition.length === 0 ? (
                  <p className="rounded-md border border-dashed p-3 text-sm text-gray-400">
                    Empty
                  </p>
                ) : (
                  playersAtPosition.map((pick) => (
                    <div
                      key={pick.pickNumber}
                      className="rounded-md border p-3 text-sm"
                    >
                      <p className="font-medium">{pick.player.fullName}</p>
                      <p className="text-gray-500">Pick {pick.pickNumber}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}