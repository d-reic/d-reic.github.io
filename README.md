# Personal site

Astro + Markdown. Interactive line drawings by [hairline](https://hairline.lucasmarkes.com);
rotating AI portraits inspired by [sunelehmann.com](https://sunelehmann.com).

```bash
npm install
npm run dev              # http://localhost:4321
npm run new "Post title" # creates a draft in src/content/blog/
npm run build            # static site in dist/
```

## Make it yours

1. **`src/site.config.ts`**: name, tagline, bio, "now" box, links, timeline, AI declaration, portrait list.
2. **`astro.config.mjs`**: set `site` to your real URL (RSS + sitemap use it).
3. Replace the placeholder portraits in `public/portraits/` (see below).
4. Delete or rewrite the three sample posts in `src/content/blog/`.

## Writing posts

Front matter fields (see `src/content.config.ts`):

| field | |
| --- | --- |
| `title`, `description`, `date` | required |
| `tags` | list, each gets a `/tags/<tag>/` page |
| `figure` | name of a hairline figure as header art (`terrain`, `riffle`, `exploded`, `branches`, `hub`, `stack`, …, all 33 on hairline's docs) |
| `cover` + `coverCaption` | an image in `public/covers/` instead (e.g. an AI-generated illustration) |
| `featured` | show in the "Featured" card on the home page |
| `draft` | visible in `npm run dev`, excluded from the build |

Inline figure inside a post (plain HTML works in Markdown):

```html
<figure class="fig">
  <div class="fig-plate"><div data-hairline="hub" data-play="true"></div></div>
  <figcaption><b>Fig. 1</b><span class="live" data-live></span></figcaption>
</figure>
```

## AI portraits

Generate a series from one good reference photo of yourself (ChatGPT / Gemini / Midjourney with
character reference all work). Keep framing and lighting identical so the shuffle feels like a set:

> Head-and-shoulders portrait of the person in the reference photo, dressed as **a beekeeper**.
> Facing the camera, slight smile, centered, plain soft **pastel yellow** studio background,
> soft diffused light, photorealistic, 4:5 portrait crop.

Swap the costume and the background colour each time. Export at roughly 800×1000, save as
`public/portraits/<name>.jpg`, and list each one in `portraits` in `src/site.config.ts`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`
(enable Pages → "GitHub Actions" in the repo settings). For a project site at
`user.github.io/repo`, also set `base: "/repo"` in `astro.config.mjs`.
Netlify / Vercel / Cloudflare Pages work out of the box with `npm run build` → `dist/`.
