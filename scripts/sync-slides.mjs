/**
 * Scans Day-* folders for slide decks and Vacation task folder for vacation
 * decks, and syncs them into the Next.js app.
 *
 * Source of truth (you edit these):
 *   Day-01/slides/*.html
 *   Day-02/slides/*.html
 *   Day-04/slides/*.html  <- just add this folder + push, Vercel picks it up
 *   Vacation task/*.html  <- vacation decks (task + quiz)
 *
 * Generated outputs (do not edit):
 *   public/slides/day01.html, day02.html, ...
 *   src/lib/days.generated.ts  (route manifest)
 *   public/vacation/*.html
 *   src/lib/vacations.generated.ts  (vacation route manifest)
 *
 * Runs automatically via `predev` / `prebuild`, and therefore on every
 * Vercel deployment. `npm run sync:slides` runs it manually.
 */
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public", "slides");
const GENERATED = join(ROOT, "src", "lib", "days.generated.ts");
const VACATION_SRC = join(ROOT, "Vacation task");
const VACATION_PUBLIC_DIR = join(ROOT, "public", "vacation");
const VACATION_GENERATED = join(ROOT, "src", "lib", "vacations.generated.ts");

function listDayDirs() {
  return readdirSync(ROOT)
    .filter((name) => /^day-\d+$/i.test(name))
    .filter((name) => {
      try {
        return statSync(join(ROOT, name)).isDirectory();
      } catch {
        return false;
      }
    })
    .sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase(), undefined, { numeric: true })
    );
}

function listSlides(dayDir) {
  const slidesDir = join(ROOT, dayDir, "slides");
  try {
    if (!statSync(slidesDir).isDirectory()) return [];
  } catch {
    return [];
  }
  return readdirSync(slidesDir)
    .filter((f) => f.toLowerCase().endsWith(".html"))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase(), undefined, { numeric: true }));
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  return m[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
}

function splitTitle(fullTitle, fallbackNum) {
  // "Day 01 — Python Foundations & Virtual Environments" -> short title after dash
  const m = fullTitle.match(/^day\s*\d+\s*[—–-]\s*(.+)$/i);
  if (m) return m[1].trim();
  return fullTitle || `Day ${fallbackNum}`;
}

function iconFor(text) {
  const t = text.toLowerCase();
  if (t.includes("git")) return "git";
  if (t.includes("number") || t.includes("string") || t.includes("type")) return "code";
  if (t.includes("virtual") || t.includes("environment") || t.includes("setup")) return "terminal";
  if (t.includes("python")) return "terminal";
  return "book";
}

function listVacationFiles() {
  try {
    if (!statSync(VACATION_SRC).isDirectory()) return [];
  } catch {
    return [];
  }
  return readdirSync(VACATION_SRC)
    .filter((f) => f.toLowerCase().endsWith(".html"))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase(), undefined, { numeric: true }));
}

function slugifyVacation(filename) {
  return filename
    .replace(/\.html$/i, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function iconForVacation(text) {
  const t = text.toLowerCase();
  if (t.includes("quiz")) return "code";
  if (t.includes("task")) return "terminal";
  return iconFor(text);
}

function prettyVacationTitle(filename) {
  return filename
    .replace(/\.html$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const dayDirs = listDayDirs();
mkdirSync(PUBLIC_DIR, { recursive: true });

const days = [];
for (const dir of dayDirs) {
  const num = parseInt(dir.match(/(\d+)/)[1], 10);
  const id = `day${String(num).padStart(2, "0")}`;
  const slides = listSlides(dir);
  if (slides.length === 0) {
    console.warn(`[sync:slides] ${dir}: no .html files in slides/ — skipped`);
    continue;
  }
  const srcFile = slides[0];
  if (slides.length > 1) {
    console.warn(
      `[sync:slides] ${dir}: ${slides.length} html files found, using first (${srcFile})`
    );
  }
  const html = readFileSync(join(ROOT, dir, "slides", srcFile), "utf8");
  const fullTitle = extractTitle(html) ?? `Day ${String(num).padStart(2, "0")}`;
  const title = splitTitle(fullTitle, num);
  const destFile = `${id}.html`;
  copyFileSync(join(ROOT, dir, "slides", srcFile), join(PUBLIC_DIR, destFile));

  days.push({
    id,
    num,
    dir,
    title,
    fullTitle,
    file: `/slides/${destFile}`,
    route: `/${id}`,
    icon: iconFor(`${title} ${fullTitle}`),
  });
}

// Remove stale public copies (e.g. Day deleted)
const wanted = new Set(days.map((d) => `${d.id}.html`));
for (const f of readdirSync(PUBLIC_DIR)) {
  if (f.toLowerCase().endsWith(".html") && !wanted.has(f)) {
    const { unlinkSync } = await import("node:fs");
    unlinkSync(join(PUBLIC_DIR, f));
    console.warn(`[sync:slides] removed stale public/slides/${f}`);
  }
}

days.sort((a, b) => a.num - b.num);

const out = `// AUTO-GENERATED by scripts/sync-slides.mjs — do not edit.
// Source of truth: Day-*/slides/*.html
export type DayIcon = "terminal" | "git" | "code" | "book";
export interface DayMeta {
  id: string;
  num: number;
  dir: string;
  title: string;
  fullTitle: string;
  file: string;
  route: string;
  icon: DayIcon;
}
export const DAYS: DayMeta[] = ${JSON.stringify(days, null, 2)};
`;

mkdirSync(dirname(GENERATED), { recursive: true });
writeFileSync(GENERATED, out);
console.log(`[sync:slides] ${days.length} day(s): ${days.map((d) => d.id).join(", ") || "none"}`);

// ---- Vacation task sync ----
const vacationFiles = listVacationFiles();
mkdirSync(VACATION_PUBLIC_DIR, { recursive: true });

const vacations = [];
for (const srcFile of vacationFiles) {
  const html = readFileSync(join(VACATION_SRC, srcFile), "utf8");
  const id = slugifyVacation(srcFile);
  if (!id) {
    console.warn(`[sync:vacation] ${srcFile}: could not derive id — skipped`);
    continue;
  }
  const fullTitle = extractTitle(html) ?? prettyVacationTitle(srcFile);
  const title = fullTitle;
  const destFile = `${id}.html`;
  copyFileSync(join(VACATION_SRC, srcFile), join(VACATION_PUBLIC_DIR, destFile));

  vacations.push({
    id,
    source: srcFile,
    title,
    fullTitle,
    file: `/vacation/${destFile}`,
    route: `/vacation/${id}`,
    icon: iconForVacation(`${title} ${fullTitle} ${srcFile}`),
  });
}

// Remove stale public vacation copies (e.g. file deleted/renamed)
const wantedVacation = new Set(vacations.map((v) => `${v.id}.html`));
try {
  for (const f of readdirSync(VACATION_PUBLIC_DIR)) {
    if (f.toLowerCase().endsWith(".html") && !wantedVacation.has(f)) {
      const { unlinkSync } = await import("node:fs");
      unlinkSync(join(VACATION_PUBLIC_DIR, f));
      console.warn(`[sync:vacation] removed stale public/vacation/${f}`);
    }
  }
} catch {
  // dir may not exist yet — already created above, ignore
}

vacations.sort((a, b) => a.id.localeCompare(b.id));

const vacationOut = `// AUTO-GENERATED by scripts/sync-slides.mjs — do not edit.
// Source of truth: Vacation task/*.html
export type VacationIcon = "terminal" | "git" | "code" | "book";
export interface VacationMeta {
  id: string;
  source: string;
  title: string;
  fullTitle: string;
  file: string;
  route: string;
  icon: VacationIcon;
}
export const VACATIONS: VacationMeta[] = ${JSON.stringify(vacations, null, 2)};
`;

mkdirSync(dirname(VACATION_GENERATED), { recursive: true });
writeFileSync(VACATION_GENERATED, vacationOut);
console.log(`[sync:vacation] ${vacations.length} vacation deck(s): ${vacations.map((v) => v.id).join(", ") || "none"}`);
