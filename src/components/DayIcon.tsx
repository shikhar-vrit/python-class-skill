import { BookOpen, GitBranch, SquareTerminal, Code2 } from "lucide-react";
import type { DayMeta } from "@/lib/days";

export function DayIcon({ day, size = 17 }: { day: DayMeta; size?: number }) {
  switch (day.icon) {
    case "git":
      return <GitBranch size={size} strokeWidth={1.8} />;
    case "terminal":
      return <SquareTerminal size={size} strokeWidth={1.8} />;
    case "code":
      return <Code2 size={size} strokeWidth={1.8} />;
    default:
      return <BookOpen size={size} strokeWidth={1.8} />;
  }
}
