import { REVISIONS, type RevisionMeta } from "./revisions.generated";

export type { RevisionMeta };
export { REVISIONS };

export function getRevision(revisionId: string): RevisionMeta | undefined {
  return REVISIONS.find((r) => r.id === revisionId.toLowerCase());
}

export function adjacentRevision(
  revisionId: string,
  dir: 1 | -1
): RevisionMeta | undefined {
  const i = REVISIONS.findIndex((r) => r.id === revisionId.toLowerCase());
  if (i === -1) return undefined;
  return REVISIONS[i + dir];
}
