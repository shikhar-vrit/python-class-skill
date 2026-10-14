"use client";

import Link from "next/link";
import { ArrowRight, Menu, Palmtree } from "lucide-react";
import { VACATIONS } from "@/lib/vacations";
import { DayIcon } from "@/components/DayIcon";
import { useNav } from "@/components/AppShell";

export default function VacationIndexPage() {
  const { setMobileOpen } = useNav();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-stone-200 bg-white px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} strokeWidth={1.8} />
        </button>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">
            Vacation
          </p>
          <h1 className="text-[15px] font-semibold tracking-tight">Vacation task</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h2 className="flex items-center gap-2 font-serif text-3xl font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <Palmtree size={19} strokeWidth={1.8} />
          </span>
          Vacation decks
        </h2>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-stone-500">
          Dashain break decks from{" "}
          <span className="font-mono text-[13px]">Vacation task/*.html</span> — each
          runs fullscreen in its own page.
        </p>

        <ul className="mt-8 space-y-3">
          {VACATIONS.map((vac) => (
            <li key={vac.id}>
              <Link
                href={vac.route}
                className="group flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4 transition-colors hover:border-amber-300 hover:bg-amber-100/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <Palmtree size={18} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold tracking-tight">
                    {vac.title}
                  </span>
                  <span className="block truncate font-mono text-xs text-stone-500">
                    {vac.route} · {vac.source}
                  </span>
                </span>
                <span className="shrink-0 text-stone-400">
                  <DayIcon day={vac} />
                </span>
                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-stone-500"
                />
              </Link>
            </li>
          ))}
        </ul>

        {VACATIONS.length === 0 && (
          <p className="mt-8 rounded-xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-500">
            No vacation decks found. Add{" "}
            <span className="font-mono">Vacation task/*.html</span> and run{" "}
            <span className="font-mono">npm run sync:slides</span>.
          </p>
        )}
      </main>
    </div>
  );
}
