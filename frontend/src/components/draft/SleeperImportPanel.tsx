"use client";

import { useState } from "react";
import { getSleeperUser } from "@/lib/api/sleeper";

export function SleeperImportPanel() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleImport() {
    try {
      setStatus("Loading Sleeper user...");

      const user = await getSleeperUser(username);

      console.log("Sleeper user:", user);

      setStatus(`Loaded user: ${user.display_name ?? user.username}`);
    } catch (error) {
      console.error(error);
      setStatus("Failed to load Sleeper user.");
    }
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Import Sleeper League</h2>

      <p className="mt-2 text-sm text-gray-500">
        Enter a Sleeper username to load leagues and draft data.
      </p>

      <div className="mt-4 flex gap-3">
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Sleeper username"
          className="flex-1 rounded-md border px-3 py-2 text-sm"
        />

        <button
          onClick={handleImport}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Import
        </button>
      </div>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </section>
  );
}