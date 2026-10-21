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
4. Write posts in `src/content/blog/` (`npm run new "Title"`).

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

Custom figures live in `src/figures/<name>.js`, drawn with the `hairline-create` skill
(`.claude/skills/hairline-create`, e.g. `/hairline-create a radiology lightbox`). Drop the
skill's `<name>.js` there as it is and use `<name>` anywhere a figure name goes; `lightbox` is the first.

Inline figure inside a post (plain HTML works in Markdown):

```html
<figure class="fig">
  <div class="fig-plate"><div data-hairline="hub" data-play="true"></div></div>
  <figcaption><b>Fig. 1</b><span class="live" data-live></span></figcaption>
</figure>
```

## AI portraits

The rotating portraits are an idea from [Sune Lehmann](https://sunelehmann.com).
Prompts and the step-by-step recipe are in [PORTRAITS.md](PORTRAITS.md); `npm run portraits <folder>`
crops and resizes the results. Only portraits whose file exists are shown, with the line-art
placeholders as a fallback.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`
(enable Pages → "GitHub Actions" in the repo settings). For a project site at
`user.github.io/repo`, also set `base: "/repo"` in `astro.config.mjs`.
Netlify / Vercel / Cloudflare Pages work out of the box with `npm run build` → `dist/`.
