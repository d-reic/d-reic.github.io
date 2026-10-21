// Mounts every [data-hairline] element as a live hairline figure.
// Works for figures rendered by <HairlineFigure> and for raw HTML in Markdown:
//   <div data-hairline="hub"></div>
// The name is one of the package's 33 figures, or a custom one in src/figures/.
import * as hairline from "@lucasmarkes/hairline";
import { HL } from "./hairline-kernel.js";

type Mount = (el: HTMLElement, opts?: hairline.HairlineOptions) => unknown;
const figures = hairline as unknown as Record<string, Mount>;

// Custom figures, drawn with the hairline-create skill. Each file in src/figures/
// is the skill's own format: it reads the kernel from a global HL and declares
// itself by calling hairline({ name, means, range, tour, mount }).
interface Custom {
  name: string;
  means: string;
  range: [number, number, number];
  tour: ([number, number] | null)[] | null;
  mount: (host: { stage: HTMLElement; svg: SVGSVGElement; read: { textContent: string } }, value: number) => unknown;
}
const custom: Record<string, Custom> = {};
const sources = import.meta.glob("../figures/*.js");
Object.assign(globalThis, { HL, hairline: (f: Custom) => (custom[f.name] = f) });

/** Mounts a custom figure the way the package mounts its own: intensity onto the figure's range, label, read-out and play. */
async function mountCustom(el: HTMLElement, name: string, opts: hairline.HairlineOptions) {
  const load = sources[`../figures/${name}.js`];
  if (!load) return;
  await load();
  const f = custom[name];
  if (!f) return;
  const i = opts.intensity ?? 0.5, [lo, mid, hi] = f.range;
  const value = i <= 0.5 ? lo + (i / 0.5) * (mid - lo) : mid + ((i - 0.5) / 0.5) * (hi - mid);

  HL.inject(document);
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", opts.label ?? f.means);
  const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, el);
  let text = "rest";
  const read = {
    get textContent() { return text; },
    set textContent(v: string) { text = v == null ? "" : String(v); opts.onRead?.(text); },
  };
  f.mount({ stage: el, svg, read }, value);
  opts.onRead?.(text);
  if (opts.play) HL.tour(el, f.tour || HL.LAP, () => {});
}

function mount(el: HTMLElement) {
  const name = el.dataset.hairline ?? "";
  if (el.dataset.mounted) return;
  el.dataset.mounted = "true";
  const live = el.closest("figure")?.querySelector<HTMLElement>("[data-live]");
  const opts: hairline.HairlineOptions = {
    intensity: el.dataset.intensity ? Number(el.dataset.intensity) : undefined,
    play: el.dataset.play === "true",
    label: el.dataset.label || undefined,
    onRead: live ? (text) => (live.textContent = text) : undefined,
  };
  const fn = figures[name];
  if (typeof fn === "function") fn(el, opts);
  else mountCustom(el, name, opts);
}

// Mount lazily: figures further down the page start when they come into view.
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      mount(e.target as HTMLElement);
    }
  },
  { rootMargin: "200px" },
);
document.querySelectorAll<HTMLElement>("[data-hairline]").forEach((el) => io.observe(el));
