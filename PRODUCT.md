# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Academic peers** (primary): researchers, reviewers, collaborators and hiring committees checking Daniel's publications, talks, teaching and background, usually after seeing a paper, a talk or a LinkedIn/Scholar profile.
- **Industry and partners**: health organisations, prospective clients of the upcoming facilitation and digital experience engineering company, and people curious about his apps (AMRAP, Gluscht, Solution, Der Harfenist).
- **General readers**: people who find a blog post and may follow along via RSS.

Students use the Resources and Teaching pages, but they are not a primary audience. The Resources page is kept out of the sitemap and shared by direct link.

## Product Purpose

The personal site of Daniel Reichenpfader, tenure-track lecturer at Bern University of Applied Sciences (BFH) and PhD candidate at the Université de Genève, working on clinical NLP and large language models in healthcare. Success means a visitor leaves with a credible, memorable picture of his work and expertise and an easy way to get in touch.

## Positioning

One person's mix that no neighbouring academic page has: clinical NLP research in radiology, hands-on app building (shipped iOS and web apps), teaching on health software and generative AI, and facilitation, presented with a personal, playful voice rather than a CV template.

## Operating Context

- Visitors arrive from papers, talks, Scholar, ORCID, LinkedIn or a shared link, often on a phone, and usually spend a minute verifying who he is and what he does.
- Pages: Home (bio, "now" box, rotating portraits), Research (publications fetched from ORCID at build time, citations chart, selected publications, talks), Teaching (BFH programmes and modules), Resources (CAS KI prompts and AI tools, English and course-neutral), Blog (tags, RSS), About (timelines and projects), 404.
- Content is edited in `src/site.config.ts` and Markdown posts in `src/content/blog/`.

## Capabilities and Constraints

- Static Astro site deployed to GitHub Pages at danielreichenpfader.com; no server-side features.
- Research data is fetched by `scripts/fetch-research.mjs` before each build (`src/data/research.json`).
- OG images are generated at build time (satori + resvg).
- English site (`lang="en"`), with some German teaching material and links.
- Light and dark themes, including code highlighting.
- Blog has no published posts yet; the blog index stays out of the sitemap until one exists.

## Brand Commitments

- **Hand-written posts**: every blog post is typed by Daniel himself; AI may proofread but does not write. The AI declaration in the footer states this and must stay true and visible.
- **Playful touches stay**: rotating AI portraits with the ↻ button, the multilingual greeting (Swedish, Swiss German, Austrian), and confetti are part of the site's personality.
- **No tracking or cookies**: only cookie-free GoatCounter; no other analytics, trackers or cookie banners.
- Credits are owed to Sune Lehmann (portrait and declaration ideas) and hairline (line drawings) wherever those features appear.
- Hairline figures are currently used for illustrations but were not confirmed as a binding commitment.

## Evidence on Hand

- Publications and citation data from ORCID (`src/data/research.json`), selected DOIs in `src/site.config.ts`.
- Real projects with live links: AMRAP (App Store), Gluscht (pilot), Solution (browser game), Der Harfenist.
- Portraits in `public/portraits/` (prompts in `PORTRAITS.md`).
- No testimonials, client logos, press or talks are recorded yet (`talks` is empty). Do not invent any.

## Product Principles

1. Credibility first: make the work easy to verify (publications, roles, real projects) before anything else.
2. A person, not a CV: the personal voice and playful details are a feature, as long as they don't hide the substance.
3. Honest about AI: be transparent about where AI was and wasn't used.
4. Respect the visitor: no tracking, fast static pages, readable on any device.
