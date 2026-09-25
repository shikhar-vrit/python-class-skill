# Python Class — Slide Decks

Next.js (TypeScript + Tailwind) viewer for the per-day HTML slide decks in `Day-*/slides/`.
Each day gets its own refresh-safe route (`/day01`, `/day02`, …) with a collapsible sidebar.

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Add a new day

1. Create `Day-04/slides/*.html` (first `.html` alphabetically is used).
2. Run `npm run sync:slides` locally, or just push — Vercel runs it automatically on every build.
3. The new `/day04` route, sidebar entry, and Prev/Next links appear with no code changes.

## How it works

- `scripts/sync-slides.mjs` (via `predev`/`prebuild`) scans `Day-*/slides/*.html`,
  copies decks to `public/slides/dayXX.html`, and regenerates `src/lib/days.generated.ts`.
- `src/app/[dayId]/page.tsx` pre-renders one static route per day, so refresh and
  direct links work on Vercel with no rewrites.
- Decks are embedded in a fullscreen iframe, unchanged.

## Deploy

Import the repo in Vercel with default settings (framework: Next.js).
