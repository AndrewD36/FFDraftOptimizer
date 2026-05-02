import type { DraftPick } from "@/lib/types/draft";

type DraftBoardProps = {
  picks: DraftPick[];
};

export function DraftBoard({ picks }: DraftBoardProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Draft Board</h2>

      <div className="mt-4 space-y-3">
        {picks.length === 0 ? (
          <p className="text-sm text-gray-500">No draft picks yet.</p>
        ) : (
          picks.map((pick) => (
            <div key={pick.pickNumber} className="rounded-lg border p-4">
              <p className="font-medium">
                Pick {pick.pickNumber} · Round {pick.round}
              </p>

              <p className="text-sm text-gray-600">
                {pick.player.fullName} — {pick.player.position}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}