import { VACATIONS, type VacationMeta } from "./vacations.generated";

export type { VacationMeta };
export { VACATIONS };

export function getVacation(vacationId: string): VacationMeta | undefined {
  return VACATIONS.find((v) => v.id === vacationId.toLowerCase());
}

export function vacationIds(): string[] {
  return VACATIONS.map((v) => v.id);
}

export function adjacentVacation(
  vacationId: string,
  dir: 1 | -1
): VacationMeta | undefined {
  const i = VACATIONS.findIndex((v) => v.id === vacationId.toLowerCase());
  if (i === -1) return undefined;
  return VACATIONS[i + dir];
}
