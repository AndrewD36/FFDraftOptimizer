import Link from "next/link";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <Link href="/" className="text-lg font-bold">
            War Room
          </Link>

          <nav className="flex gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-black">
              Home
            </Link>

            <Link href="/draft" className="text-gray-600 hover:text-black">
              Draft
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}