import type { DraftMode, DraftRoomState } from "@/lib/types/draft";
import { DraftModeToggle } from "./DraftModeToggle";

type DraftRoomHeaderProps = {
  mode: DraftMode;
  draftRoomState: DraftRoomState;
  onChangeMode: (mode: DraftMode) => void;
};

export function DraftRoomHeader({
  mode,
  draftRoomState,
  onChangeMode,
}: DraftRoomHeaderProps) {
  const draftId = draftRoomState.draft.draftId;

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Draft War Room</h1>

          <p className="mt-2 text-gray-600">
            Companion analytics dashboard. Your actual picks are made in
            Sleeper.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
            <span>
              Status:{" "}
              <strong className="text-black">
                {draftRoomState.draft.status}
              </strong>
            </span>

            <span>
              Current Pick:{" "}
              <strong className="text-black">
                {draftRoomState.draft.currentPick}
              </strong>
            </span>

            <span>
              Round:{" "}
              <strong className="text-black">
                {draftRoomState.draft.currentRound}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <DraftModeToggle mode={mode} onChangeMode={onChangeMode} />

          {mode === "live" && draftId && (
            <a
              href={`https://sleeper.com/draft/nfl/${draftId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white"
            >
              Open Sleeper Draft
            </a>
          )}
        </div>
      </div>
    </section>
  );
}