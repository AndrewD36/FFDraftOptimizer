import type { DraftMode } from "@/lib/types/draft";

type DraftModeToggleProps = {
  mode: DraftMode;
  onChangeMode: (mode: DraftMode) => void;
};

export function DraftModeToggle({ mode, onChangeMode }: DraftModeToggleProps) {
  return (
    <div className="flex rounded-lg border bg-white p-1">
      <button
        onClick={() => onChangeMode("mock")}
        className={`rounded-md px-3 py-2 text-sm ${
          mode === "mock" ? "bg-black text-white" : "text-gray-600"
        }`}
      >
        Mock Mode
      </button>

      <button
        onClick={() => onChangeMode("live")}
        className={`rounded-md px-3 py-2 text-sm ${
          mode === "live" ? "bg-black text-white" : "text-gray-600"
        }`}
      >
        Live Companion
      </button>
    </div>
  );
}