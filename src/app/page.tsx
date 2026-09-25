"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { DAYS } from "@/lib/days";
import { DayIcon } from "@/components/DayIcon";
import { useNav } from "@/components/AppShell";

export default function HomePage() {
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
            Overview
          </p>
          <h1 className="text-[15px] font-semibold tracking-tight">Python Course</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">
          Slide decks
        </h2>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-stone-500">
          One route per day. Each deck runs fullscreen in its own page — pick up
          where the class left off.
        </p>

        <ul className="mt-8 space-y-3">
          {DAYS.map((day) => (
            <li key={day.id}>
              <Link
                href={day.route}
                className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-stone-300 hover:bg-stone-50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-900 font-mono text-xs font-semibold text-white">
                  {String(day.num).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold tracking-tight">
                    {day.title}
                  </span>
                  <span className="block font-mono text-xs text-stone-400">
                    /{day.id} · {day.dir}
                  </span>
                </span>
                <span className="shrink-0 text-stone-400">
                  <DayIcon day={day} />
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

        {DAYS.length === 0 && (
          <p className="mt-8 rounded-xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-500">
            No decks found. Add <span className="font-mono">Day-01/slides/*.html</span> and
            run <span className="font-mono">npm run sync:slides</span>.
          </p>
        )}
      </main>
    </div>
  );
}
