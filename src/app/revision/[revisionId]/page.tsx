import { notFound } from "next/navigation";
import { REVISIONS, getRevision, adjacentRevision } from "@/lib/revisions";
import { SlideViewer } from "@/components/SlideViewer";

// Each /revision/xxx becomes a real static route at build time, so refresh and
// direct links work on Vercel with no SPA fallback or rewrite rules.
export function generateStaticParams() {
  return REVISIONS.map((r) => ({ revisionId: r.id }));
}

export function generateMetadata({ params }: { params: { revisionId: string } }) {
  const rev = getRevision(params.revisionId);
  return { title: rev ? rev.fullTitle : "Not found" };
}

export default function RevisionDeckPage({ params }: { params: { revisionId: string } }) {
  const rev = getRevision(params.revisionId);
  if (!rev) notFound();
  const prev = adjacentRevision(rev.id, -1);
  const next = adjacentRevision(rev.id, 1);
  return <SlideViewer day={rev} prev={prev} next={next} kicker={`Revision · ${rev.dir}`} />;
}
