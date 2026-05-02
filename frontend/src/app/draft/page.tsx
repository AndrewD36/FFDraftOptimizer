"use client";

import { useState } from "react";
import { AvailablePlayersTable } from "@/components/draft/AvailablePlayersTable";
import { DraftBoard } from "@/components/draft/DraftBoard";
import { RecommendationPanel } from "@/components/draft/RecommendationPanel";
import { TeamRosterPanel } from "@/components/draft/TeamRosterPanel";
import { SleeperImportPanel } from "@/components/draft/SleeperImportPanel";
import { mockPlayers } from "@/lib/mock/players";
import type { Player } from "@/lib/types/player";
import type { DraftPick } from "@/lib/types/draft";

export default function DraftPage() {
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(mockPlayers);
  const [picks, setPicks] = useState<DraftPick[]>([]);

  function draftPlayer(player: Player) {
    const nextPickNumber = picks.length + 1;

    const newPick: DraftPick = {
      pickNumber: nextPickNumber,
      round: Math.ceil(nextPickNumber / 12),
      rosterId: 1,
      player,
    };

    setPicks([...picks, newPick]);

    setAvailablePlayers(
      availablePlayers.filter((availablePlayer) => {
        return availablePlayer.id !== player.id;
      })
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
        
      <h1 className="text-3xl font-bold">Draft Room</h1>

      <p className="mt-2 text-gray-600">
        Prototype draft room using mock player data.
      </p>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
            <SleeperImportPanel />

            <DraftBoard picks={picks} />

            <AvailablePlayersTable
                players={availablePlayers}
                onDraftPlayer={draftPlayer}
            />
        </div>

        <div className="space-y-6">
          <RecommendationPanel players={availablePlayers} />
          <TeamRosterPanel picks={picks} />
        </div>
      </section>
    </main>
  );
}