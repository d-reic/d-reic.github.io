// Social preview cards (og:image), rendered to PNG at build time: one for the
// site (/og/default.png) and one per blog post (/og/blog/<id>.png).
import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";

// satori's ESM build expects CommonJS globals (__dirname) when it runs in Node,
// so load its CommonJS build instead.
const satori: typeof import("satori").default = createRequire(import.meta.url)("satori").default;
import { site, portraits } from "../../site.config";
import { getPosts, fmtDate } from "../../lib/posts";

export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    { params: { slug: "default" }, props: { title: site.name, kicker: site.tagline, meta: site.role } },
    ...posts.map((p) => ({
      params: { slug: `blog/${p.id}` },
      props: { title: p.data.title, kicker: fmtDate(p.data.date), meta: site.name },
    })),
  ];
}

const font = (pkg: string, file: string) => readFileSync(`node_modules/@fontsource/${pkg}/files/${file}`);
const fonts = [
  { name: "Instrument Serif", data: font("instrument-serif", "instrument-serif-latin-400-normal.woff"), weight: 400, style: "normal" },
  { name: "Instrument Serif", data: font("instrument-serif", "instrument-serif-latin-400-italic.woff"), weight: 400, style: "italic" },
  { name: "Geist", data: font("geist", "geist-latin-400-normal.woff"), weight: 400, style: "normal" },
  { name: "Geist Mono", data: font("geist-mono", "geist-mono-latin-400-normal.woff"), weight: 400, style: "normal" },
] as const;
const portrait = `data:image/jpeg;base64,${readFileSync(`public${portraits[0].src}`).toString("base64")}`;

// The site's light palette.
const c = { bg: "#f5f2ea", ink: "#1d1c1a", soft: "#3d3a35", muted: "#77726a", rule: "#bfb6a4", accent: "#1f3f7a" };

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node =>
  ({ type, props: { style: { display: "flex", ...style }, children, ...extra } });

// The ruler under the header, as on the site: a baseline with long and short ticks.
const ruler = h("div", { position: "absolute", left: 72, right: 72, bottom: 56, height: 14, borderBottom: `2px solid ${c.rule}` },
  Array.from({ length: 66 }, (_, i) => h("div", { position: "absolute", left: i * 16, bottom: 0, width: 2, height: i % 5 === 0 ? 14 : 6, background: c.rule })));

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker, meta } = props as { title: string; kicker: string; meta: string };
  const long = title.length > 38;

  const svg = await satori(
    h("div", { width: 1200, height: 630, background: c.bg, position: "relative", padding: "72px 72px 0", fontFamily: "Geist" }, [
      h("div", { flexDirection: "column", flex: 1, paddingRight: 56 }, [
        h("div", { fontFamily: "Geist Mono", fontSize: 22, letterSpacing: 3, color: c.muted, textTransform: "uppercase" }, "danielreichenpfader.com"),
        h("div", { fontFamily: "Instrument Serif", fontSize: long ? 76 : 96, lineHeight: 1.02, color: c.ink, marginTop: 48, letterSpacing: -1 }, title),
        h("div", { fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 44, color: c.muted, marginTop: 18 }, kicker),
        h("div", { fontSize: 26, color: c.soft, marginTop: "auto", marginBottom: 110, borderLeft: `3px solid ${c.accent}`, paddingLeft: 18 }, meta),
      ]),
      h("div", { flexDirection: "column", width: 300 }, [
        h("img", { width: 300, height: 375, objectFit: "cover", borderRadius: 8, border: `2px solid ${c.rule}` }, undefined, { src: portrait, width: 300, height: 375 }),
        h("div", { fontFamily: "Geist Mono", fontSize: 18, color: c.muted, marginTop: 14 }, [
          h("span", { color: c.ink, marginRight: 10 }, "Fig. 1"),
          h("span", {}, `${site.shortName}, ${portraits[0].caption}`),
        ]),
      ]),
      ruler,
    ]) as never,
    { width: 1200, height: 630, fonts: fonts as never },
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
