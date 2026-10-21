// Fetches publications from ORCID and their citations from OpenAlex, and writes
// src/data/research.json. Runs before every build (npm "prebuild"), and the
// deploy workflow rebuilds daily, so the numbers stay current. If a source is
// down, the last good file is kept and the build carries on.
//
// Google Scholar has no API, so citations come from OpenAlex instead. They are
// counted per DOI from your own ORCID list, which keeps other people's papers out.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const ORCID = "0000-0002-8052-3359";
const OUT = "src/data/research.json";
const UA = { "User-Agent": "danielreichenpfader.com (mailto:hello@danielreichenpfader.com)" };

const getJSON = async (url, headers = {}) => {
  const res = await fetch(url, { headers: { ...UA, ...headers } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 70);

async function main() {
  const orcid = await getJSON(`https://pub.orcid.org/v3.0/${ORCID}/works`, { Accept: "application/json" });

  let works = orcid.group.map((g) => {
    const s = g["work-summary"][0];
    const ids = g["external-ids"]?.["external-id"] ?? [];
    const doi = ids.find((e) => e["external-id-type"] === "doi")?.["external-id-value"]?.toLowerCase() ?? null;
    return {
      title: s.title?.title?.value ?? "Untitled",
      year: Number(s["publication-date"]?.year?.value) || null,
      type: s.type,
      venue: s["journal-title"]?.value ?? null,
      doi,
      url: doi ? `https://doi.org/${doi}` : s.url?.value ?? null,
    };
  });

  // A preprint whose published version is also listed adds nothing to the list.
  const published = new Set(works.filter((w) => w.type !== "preprint").map((w) => norm(w.title)));
  const isDuplicatePreprint = (w) => w.type === "preprint" && published.has(norm(w.title));

  // Citations per DOI, in chunks (OpenAlex allows up to 100 values per filter).
  const dois = works.map((w) => w.doi).filter(Boolean);
  const cites = new Map();
  for (let i = 0; i < dois.length; i += 50) {
    const chunk = dois.slice(i, i + 50).map((d) => `https://doi.org/${d}`).join("|");
    const page = await getJSON(
      `https://api.openalex.org/works?per-page=100&select=doi,cited_by_count,counts_by_year,primary_location&filter=doi:${encodeURIComponent(chunk)}`,
    );
    for (const r of page.results) cites.set(r.doi.replace("https://doi.org/", "").toLowerCase(), r);
  }

  const byYear = {};
  for (const w of works) {
    const r = w.doi && cites.get(w.doi);
    w.citations = r ? r.cited_by_count : null;
    w.venue ??= r?.primary_location?.source?.display_name ?? null;
    // Citations of a preprint still count towards the totals, even when it is hidden from the list.
    for (const c of r?.counts_by_year ?? []) byYear[c.year] = (byYear[c.year] ?? 0) + c.cited_by_count;
  }

  const counts = works.map((w) => w.citations ?? 0).sort((a, b) => b - a);
  const firstYear = Math.min(...works.map((w) => w.year).filter(Boolean));
  const thisYear = new Date().getFullYear();
  const perYear = [];
  for (let y = firstYear; y <= thisYear; y++) perYear.push({ year: y, citations: byYear[y] ?? 0 });

  works = works.filter((w) => !isDuplicatePreprint(w));
  works.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.citations ?? 0) - (a.citations ?? 0));

  const data = {
    fetchedAt: new Date().toISOString(),
    orcid: ORCID,
    totals: {
      citations: counts.reduce((a, b) => a + b, 0),
      hIndex: counts.filter((c, i) => c >= i + 1).length,
      publications: works.length,
    },
    perYear,
    works,
  };
  mkdirSync("src/data", { recursive: true });
  writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`research: ${works.length} publications, ${data.totals.citations} citations, h-index ${data.totals.hIndex}`);
}

main().catch((err) => {
  let kept = false;
  try { kept = !!readFileSync(OUT, "utf8"); } catch {}
  console.warn(`research: fetch failed (${err.message}); ${kept ? "keeping the last saved data" : "no saved data yet"}`);
  if (!kept) process.exit(1);
});
