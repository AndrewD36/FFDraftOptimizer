"use client";

import { useState } from "react";
import type { DraftMode } from "@/lib/types/draft";
import type { Player, Position } from "@/lib/types/player";

type PlayerPoolTableProps = {
  mode: DraftMode;
  players: Player[];
  pinnedPlayerIds: string[];
  ignoredPlayerIds: string[];
  comparedPlayerIds: string[];
  recommendedPlayerIds: string[];
  onSimulatePick: (player: Player) => void;
  onPinPlayer: (playerId: string) => void;
  onIgnorePlayer: (playerId: string) => void;
  onComparePlayer: (playerId: string) => void;
};

const positions: Array<Position | "ALL"> = [
  "ALL",
  "QB",
  "RB",
  "WR",
  "TE",
  "K",
  "DEF",
];

export function PlayerPoolTable({
  mode,
  players,
  pinnedPlayerIds,
  ignoredPlayerIds,
  comparedPlayerIds,
  recommendedPlayerIds,
  onSimulatePick,
  onPinPlayer,
  onIgnorePlayer,
  onComparePlayer,
}: PlayerPoolTableProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<Position | "ALL">(
    "ALL"
  );
  const [hideIgnored, setHideIgnored] = useState(true);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.fullName
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesPosition =
      selectedPosition === "ALL" || player.position === selectedPosition;

    const matchesIgnoredFilter =
      !hideIgnored || !ignoredPlayerIds.includes(player.id);

    return matchesSearch && matchesPosition && matchesIgnoredFilter;
  });

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Player Pool</h2>
          <p className="mt-1 text-sm text-gray-500">
            Analyze remaining players. Picks must still be made in Sleeper.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search players..."
            className="rounded-md border px-3 py-2 text-sm"
          />

          <select
            value={selectedPosition}
            onChange={(event) =>
              setSelectedPosition(event.target.value as Position | "ALL")
            }
            className="rounded-md border px-3 py-2 text-sm"
          >
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={hideIgnored}
              onChange={(event) => setHideIgnored(event.target.checked)}
            />
            Hide ignored
          </label>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filteredPlayers.length === 0 ? (
          <p className="text-sm text-gray-500">No matching players.</p>
        ) : (
          filteredPlayers.map((player) => {
            const isPinned = pinnedPlayerIds.includes(player.id);
            const isIgnored = ignoredPlayerIds.includes(player.id);
            const isCompared = comparedPlayerIds.includes(player.id);
            const isRecommended = recommendedPlayerIds.includes(player.id);

            return (
              <div
                key={player.id}
                className={`rounded-lg border p-4 ${
                  isRecommended ? "border-black bg-gray-50" : ""
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{player.fullName}</p>

                      {isRecommended && (
                        <span className="rounded-full bg-black px-2 py-1 text-xs text-white">
                          Recommended
                        </span>
                      )}

                      {isPinned && (
                        <span className="rounded-full border px-2 py-1 text-xs">
                          Pinned
                        </span>
                      )}

                      {isCompared && (
                        <span className="rounded-full border px-2 py-1 text-xs">
                          Compare
                        </span>
                      )}

                      {isIgnored && (
                        <span className="rounded-full border px-2 py-1 text-xs text-gray-500">
                          Ignored
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {player.position} · {player.nflTeam} · ADP {player.adp} ·
                      Tier {player.tier}
                    </p>

                    <p className="text-sm text-gray-500">
                      Projected Points: {player.projectedPoints}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mode === "mock" && (
                      <button
                        onClick={() => onSimulatePick(player)}
                        className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white"
                      >
                        Simulate Pick
                      </button>
                    )}

                    <button
                      onClick={() => onPinPlayer(player.id)}
                      className="rounded-md border px-3 py-2 text-sm"
                    >
                      {isPinned ? "Unpin" : "Pin"}
                    </button>

                    <button
                      onClick={() => onComparePlayer(player.id)}
                      className="rounded-md border px-3 py-2 text-sm"
                    >
                      {isCompared ? "Remove Compare" : "Compare"}
                    </button>

                    <button
                      onClick={() => onIgnorePlayer(player.id)}
                      className="rounded-md border px-3 py-2 text-sm"
                    >
                      {isIgnored ? "Unignore" : "Ignore"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}