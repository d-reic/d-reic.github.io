// Mounts every [data-hairline] element as a live hairline figure.
// Works for figures rendered by <HairlineFigure> and for raw HTML in Markdown:
//   <div data-hairline="hub"></div>
import * as hairline from "@lucasmarkes/hairline";

type Mount = (el: HTMLElement, opts?: hairline.HairlineOptions) => unknown;
const figures = hairline as unknown as Record<string, Mount>;

function mount(el: HTMLElement) {
  const fn = figures[el.dataset.hairline ?? ""];
  if (typeof fn !== "function" || el.dataset.mounted) return;
  el.dataset.mounted = "true";
  const live = el.closest("figure")?.querySelector<HTMLElement>("[data-live]");
  fn(el, {
    intensity: el.dataset.intensity ? Number(el.dataset.intensity) : undefined,
    play: el.dataset.play === "true",
    label: el.dataset.label || undefined,
    onRead: live ? (text) => (live.textContent = text) : undefined,
  });
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
