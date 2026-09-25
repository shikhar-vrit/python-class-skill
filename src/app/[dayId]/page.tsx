import { notFound } from "next/navigation";
import { DAYS, getDay } from "@/lib/days";
import { SlideViewer } from "@/components/SlideViewer";

// Each /dayXX becomes a real static route at build time, so refresh and
// direct links work on Vercel with no SPA fallback or rewrite rules.
export function generateStaticParams() {
  return DAYS.map((d) => ({ dayId: d.id }));
}

export function generateMetadata({ params }: { params: { dayId: string } }) {
  const day = getDay(params.dayId);
  return { title: day ? day.fullTitle : "Not found" };
}

export default function DayPage({ params }: { params: { dayId: string } }) {
  const day = getDay(params.dayId);
  if (!day) notFound();
  return <SlideViewer day={day} />;
}
