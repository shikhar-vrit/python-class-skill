"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Loader2,
  Maximize,
  Menu,
  Minimize,
  RotateCcw,
} from "lucide-react";
import { adjacentDay, type DayMeta } from "@/lib/days";
import { useNav } from "./AppShell";

function ToolButton({
  title,
  onClick,
  href,
  download,
  children,
  disabled,
}: {
  title: string;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const cls =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 disabled:pointer-events-none disabled:opacity-35";
  if (href) {
    return (
      <a
        href={href}
        target={download ? undefined : "_blank"}
        rel="noreferrer"
        download={download || undefined}
        title={title}
        aria-label={title}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} title={title} aria-label={title} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

export function SlideViewer({ day }: { day: DayMeta }) {
  const { setMobileOpen } = useNav();
  const frameRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prev = adjacentDay(day.id, -1);
  const next = adjacentDay(day.id, 1);

  useEffect(() => {
    setLoading(true);
  }, [day.id, reloadKey]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void frameRef.current?.requestFullscreen?.();
    }
  }, []);

  // Keyboard: Alt+Arrow switches days (arrows alone drive the deck inside the frame)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      if (e.key === "ArrowLeft" && prev) window.location.assign(prev.route);
      if (e.key === "ArrowRight" && next) window.location.assign(next.route);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Toolbar */}
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-stone-200 bg-white px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} strokeWidth={1.8} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">
            {day.id.replace("day", "Day ")} · {day.dir}
          </p>
          <h1 className="truncate text-[15px] font-semibold tracking-tight">{day.title}</h1>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={prev?.route ?? "#"}
            aria-disabled={!prev}
            title={prev ? `Previous: ${prev.fullTitle}` : "No previous day"}
            className={`flex h-9 items-center gap-1 rounded-lg border border-stone-200 px-2.5 text-sm font-medium transition-colors ${
              prev
                ? "bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                : "pointer-events-none bg-white text-stone-300"
            }`}
          >
            <ChevronLeft size={16} strokeWidth={1.8} />
            <span className="hidden sm:inline">Prev</span>
          </Link>
          <Link
            href={next?.route ?? "#"}
            aria-disabled={!next}
            title={next ? `Next: ${next.fullTitle}` : "No next day yet"}
            className={`flex h-9 items-center gap-1 rounded-lg px-2.5 text-sm font-medium transition-colors ${
              next
                ? "bg-stone-900 text-white hover:bg-stone-700"
                : "pointer-events-none bg-stone-100 text-stone-400"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="hidden h-6 w-px bg-stone-200 sm:block" />

        <div className="hidden items-center gap-1.5 sm:flex">
          <ToolButton title="Reload slides" onClick={() => setReloadKey((k) => k + 1)}>
            <RotateCcw size={16} strokeWidth={1.8} />
          </ToolButton>
          <ToolButton title="Download deck (HTML file)" href={day.file} download>
            <Download size={16} strokeWidth={1.8} />
          </ToolButton>
          <ToolButton title="Open standalone deck in new tab" href={day.file}>
            <ExternalLink size={16} strokeWidth={1.8} />
          </ToolButton>
          <ToolButton
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize size={16} strokeWidth={1.8} />
            ) : (
              <Maximize size={16} strokeWidth={1.8} />
            )}
          </ToolButton>
        </div>
      </header>

      {/* Fullscreen slide area */}
      <div ref={frameRef} className="relative flex-1 bg-stone-950">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-sm text-stone-400">
            <Loader2 size={17} className="animate-spin" />
            Loading {day.id}…
          </div>
        )}
        <iframe
          key={`${day.file}-${reloadKey}`}
          src={day.file}
          title={day.fullTitle}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
