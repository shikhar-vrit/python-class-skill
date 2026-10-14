import { notFound } from "next/navigation";
import { VACATIONS, getVacation, adjacentVacation } from "@/lib/vacations";
import { SlideViewer } from "@/components/SlideViewer";

// Each /vacation/xxx becomes a real static route at build time, so refresh and
// direct links work on Vercel with no SPA fallback or rewrite rules.
export function generateStaticParams() {
  return VACATIONS.map((v) => ({ vacationId: v.id }));
}

export function generateMetadata({ params }: { params: { vacationId: string } }) {
  const vac = getVacation(params.vacationId);
  return { title: vac ? vac.fullTitle : "Not found" };
}

export default function VacationDeckPage({ params }: { params: { vacationId: string } }) {
  const vac = getVacation(params.vacationId);
  if (!vac) notFound();
  const prev = adjacentVacation(vac.id, -1);
  const next = adjacentVacation(vac.id, 1);
  return <SlideViewer day={vac} prev={prev} next={next} />;
}
