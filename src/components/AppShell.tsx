"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/cn";

interface NavState {
  collapsed: boolean;
  toggleCollapsed: () => void;
  setMobileOpen: (v: boolean) => void;
}

const NavContext = createContext<NavState>({
  collapsed: false,
  toggleCollapsed: () => {},
  setMobileOpen: () => {},
});

export const useNav = () => useContext(NavContext);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCollapsed = useCallback(() => setCollapsed((v) => !v), []);

  return (
    <NavContext.Provider value={{ collapsed, toggleCollapsed, setMobileOpen }}>
      <div className="min-h-dvh">
        <Sidebar
          collapsed={collapsed}
          onToggle={toggleCollapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "flex min-h-dvh flex-col transition-[padding] duration-200",
            collapsed ? "lg:pl-[76px]" : "lg:pl-[280px]"
          )}
        >
          {children}
        </div>
      </div>
    </NavContext.Provider>
  );
}
