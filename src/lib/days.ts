import { DAYS, type DayMeta } from "./days.generated";

export type { DayMeta };
export { DAYS };

export function getDay(dayId: string): DayMeta | undefined {
  return DAYS.find((d) => d.id === dayId.toLowerCase());
}

export function dayIds(): string[] {
  return DAYS.map((d) => d.id);
}

export function adjacentDay(dayId: string, dir: 1 | -1): DayMeta | undefined {
  const i = DAYS.findIndex((d) => d.id === dayId.toLowerCase());
  if (i === -1) return undefined;
  return DAYS[i + dir];
}
