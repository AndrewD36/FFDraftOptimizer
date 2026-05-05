"use client";

import { useState } from "react";

export function SleeperImportPanel() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  function handleImport() {
    setStatus(`Loading leagues for ${username}...`);
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Connect Sleeper Draft</h2>

      <p className="mt-2 text-sm text-gray-500">
        Enter your Sleeper username to load leagues and watch your draft from
        this companion dashboard.
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
          Load Leagues
        </button>
      </div>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </section>
  );
}