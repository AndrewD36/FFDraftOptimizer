"use client";

import { useState } from "react";
import { DraftBoard } from "@/components/draft/DraftBoard";
import { DraftRoomHeader } from "@/components/draft/DraftRoomHeader";
import { PlayerPoolTable } from "@/components/draft/PlayerPoolTable";
import { RecommendationPanel } from "@/components/draft/RecommendationPanel";
import { SleeperImportPanel } from "@/components/draft/SleeperImportPanel";
import { TeamRosterPanel } from "@/components/draft/TeamRosterPanel";
import { mockPlayers } from "@/lib/mock/players";
import { mockRecommendations } from "@/lib/mock/recommendations";
import type {
  DraftMode,
  DraftPick,
  DraftRoomState,
} from "@/lib/types/draft";
import type { Player } from "@/lib/types/player";

export default function DraftPage() {
  const [mode, setMode] = useState<DraftMode>("mock");

  const [availablePlayers, setAvailablePlayers] =
    useState<Player[]>(mockPlayers);

  const [picks, setPicks] = useState<DraftPick[]>([]);

  const [pinnedPlayerIds, setPinnedPlayerIds] = useState<string[]>([]);
  const [ignoredPlayerIds, setIgnoredPlayerIds] = useState<string[]>([]);
  const [comparedPlayerIds, setComparedPlayerIds] = useState<string[]>([]);

  const draftRoomState: DraftRoomState = {
    mode,
    draft: {
      draftId: mode === "live" ? undefined : "mock-draft",
      status: picks.length === 0 ? "pre_draft" : "drafting",
      currentPick: picks.length + 1,
      currentRound: Math.ceil((picks.length + 1) / 12),
      currentRosterId: 1,
    },
    user: {
      sleeperUserId: "mock-user",
      rosterId: 1,
      teamName: "My Team",
    },
    picks,
    rosters: [
      {
        rosterId: 1,
        teamName: "My Team",
        picks,
      },
    ],
    availablePlayers,
    recommendations: mockRecommendations.filter((recommendation) =>
      availablePlayers.some((player) => player.id === recommendation.playerId)
    ),
  };

  const recommendedPlayerIds = draftRoomState.recommendations.map(
    (recommendation) => recommendation.playerId
  );

  function simulatePick(player: Player) {
    if (mode !== "mock") {
      return;
    }

    const nextPickNumber = picks.length + 1;

    const newPick: DraftPick = {
      pickNumber: nextPickNumber,
      round: Math.ceil(nextPickNumber / 12),
      rosterId: 1,
      player,
    };

    setPicks((previousPicks) => [...previousPicks, newPick]);

    setAvailablePlayers((previousPlayers) =>
      previousPlayers.filter((availablePlayer) => {
        return availablePlayer.id !== player.id;
      })
    );
  }

  function togglePinnedPlayer(playerId: string) {
    setPinnedPlayerIds((previousIds) => {
      if (previousIds.includes(playerId)) {
        return previousIds.filter((id) => id !== playerId);
      }

      return [...previousIds, playerId];
    });
  }

  function toggleIgnoredPlayer(playerId: string) {
    setIgnoredPlayerIds((previousIds) => {
      if (previousIds.includes(playerId)) {
        return previousIds.filter((id) => id !== playerId);
      }

      return [...previousIds, playerId];
    });
  }

  function toggleComparedPlayer(playerId: string) {
    setComparedPlayerIds((previousIds) => {
      if (previousIds.includes(playerId)) {
        return previousIds.filter((id) => id !== playerId);
      }

      return [...previousIds, playerId];
    });
  }

  function handleChangeMode(nextMode: DraftMode) {
    setMode(nextMode);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="space-y-6">
        <DraftRoomHeader
          mode={mode}
          draftRoomState={draftRoomState}
          onChangeMode={handleChangeMode}
        />

        {mode === "live" && <SleeperImportPanel />}

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DraftBoard picks={draftRoomState.picks} />

            <PlayerPoolTable
              mode={mode}
              players={draftRoomState.availablePlayers}
              pinnedPlayerIds={pinnedPlayerIds}
              ignoredPlayerIds={ignoredPlayerIds}
              comparedPlayerIds={comparedPlayerIds}
              recommendedPlayerIds={recommendedPlayerIds}
              onSimulatePick={simulatePick}
              onPinPlayer={togglePinnedPlayer}
              onIgnorePlayer={toggleIgnoredPlayer}
              onComparePlayer={toggleComparedPlayer}
            />
          </div>

          <div className="space-y-6">
            <RecommendationPanel
              recommendations={draftRoomState.recommendations}
              onPinPlayer={togglePinnedPlayer}
              onComparePlayer={toggleComparedPlayer}
            />

            <TeamRosterPanel picks={draftRoomState.picks} />
          </div>
        </section>
      </div>
    </main>
  );
}