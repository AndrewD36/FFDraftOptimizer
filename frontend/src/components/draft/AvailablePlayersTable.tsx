"use client";

import { useState } from "react";
import type { Player, Position } from "@/lib/types/player";

type AvailablePlayersTableProps = {
  players: Player[];
  onDraftPlayer: (player: Player) => void;
};

const positions: Array<Position | "ALL"> = ["ALL", "QB", "RB", "WR", "TE", "K", "DEF"];

export function AvailablePlayersTable({
  players,
  onDraftPlayer,
}: AvailablePlayersTableProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<Position | "ALL">(
    "ALL"
  );

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.fullName
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesPosition =
      selectedPosition === "ALL" || player.position === selectedPosition;

    return matchesSearch && matchesPosition;
  });

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold">Available Players</h2>

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
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filteredPlayers.length === 0 ? (
          <p className="text-sm text-gray-500">No matching players.</p>
        ) : (
          filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{player.fullName}</p>

                <p className="text-sm text-gray-500">
                  {player.position} · {player.nflTeam} · ADP {player.adp} · Tier{" "}
                  {player.tier}
                </p>

                <p className="text-sm text-gray-500">
                  Projected Points: {player.projectedPoints}
                </p>
              </div>

              <button
                onClick={() => onDraftPlayer(player)}
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Draft
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}