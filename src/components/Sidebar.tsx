"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  House,
  Layers,
  PlusCircle,
  X,
} from "lucide-react";
import { DAYS } from "@/lib/days";
import { DayIcon } from "./DayIcon";
import { cn } from "@/lib/cn";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function Nav({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 slim-scroll">
      <Link
        href="/"
        onClick={onNavigate}
        title="Overview"
        className={cn(
          "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          pathname === "/"
            ? "bg-stone-900 text-white"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900",
          collapsed && "justify-center px-0"
        )}
      >
        <House size={17} strokeWidth={1.8} className="shrink-0" />
        {!collapsed && <span>Overview</span>}
      </Link>

      {!collapsed && (
        <p className="mb-2 mt-5 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">
          Days · {DAYS.length}
        </p>
      )}

      <ul className="space-y-1">
        {DAYS.map((day) => {
          const active = pathname === day.route;
          return (
            <li key={day.id}>
              <Link
                href={day.route}
                onClick={onNavigate}
                title={collapsed ? day.fullTitle : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900",
                  collapsed && "justify-center px-0"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-semibold",
                    active
                      ? "bg-white/15 text-white"
                      : "bg-stone-100 text-stone-500 group-hover:bg-stone-200 group-hover:text-stone-700"
                  )}
                >
                  {String(day.num).padStart(2, "0")}
                </span>
                {!collapsed && (
                  <span className="min-w-0">
                    <span className="block truncate font-medium leading-tight">
                      {day.title}
                    </span>
                    <span
                      className={cn(
                        "block text-xs leading-tight",
                        active ? "text-stone-300" : "text-stone-400"
                      )}
                    >
                      /{day.id}
                    </span>
                  </span>
                )}
                {!collapsed && (
                  <span className={cn("ml-auto shrink-0", active ? "text-stone-300" : "text-stone-400")}>
                    <DayIcon day={day} size={16} />
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {!collapsed && (
        <div className="mt-6 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
            <PlusCircle size={14} strokeWidth={1.8} />
            Adding Day 04?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-stone-500">
            Create <span className="font-mono">Day-04/slides/*.html</span> and push — the
            next deploy picks it up automatically.
          </p>
        </div>
      )}
    </nav>
  );
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }: Props) {
  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-stone-200 bg-white transition-[width] duration-200 lg:flex",
          collapsed ? "w-[76px]" : "w-[280px]"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center gap-2.5 border-b border-stone-200 px-4",
            collapsed && "justify-center px-0"
          )}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-900 text-white">
            <Layers size={16} strokeWidth={1.8} />
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight">
                Python Course
              </span>
              <span className="block text-xs text-stone-400">Slide decks</span>
            </span>
          )}
        </div>

        <Nav collapsed={collapsed} />

        <div className="border-t border-stone-200 p-3">
          <button
            onClick={onToggle}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronsRight size={17} strokeWidth={1.8} />
            ) : (
              <>
                <ChevronsLeft size={17} strokeWidth={1.8} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-stone-950/40 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onCloseMobile}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-white shadow-xl transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-stone-200 px-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white">
            <Layers size={16} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold tracking-tight">
              Python Course
            </span>
            <span className="block text-xs text-stone-400">Slide decks</span>
          </span>
          <button
            onClick={onCloseMobile}
            className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100"
            aria-label="Close menu"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>
        <Nav collapsed={false} onNavigate={onCloseMobile} />
      </aside>
    </>
  );
}
