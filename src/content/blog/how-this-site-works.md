---
title: "How this site works"
description: "Markdown in, static HTML out. Plus rotating AI portraits and line drawings you can poke at."
date: 2026-10-14
tags: [meta, web]
figure: exploded
---

This site is a handful of Markdown files and an [Astro](https://astro.build) build step. There is no database and no CMS, and nothing runs on a server. Writing a post means creating a file.

## Writing a post

Each post is a Markdown file in `src/content/blog/` with a little front matter:

```yaml
---
title: "A new post"
description: "One sentence for the list and the preview card."
date: 2026-10-21
tags: [notes]
figure: terrain     # a hairline figure as header art…
cover: /covers/x.jpg # …or an AI-generated image instead
draft: true          # visible in dev, hidden in the build
---
```

Or just run `npm run new "A new post"` and start typing.

## The figures

The line drawings come from [hairline](https://hairline.lucasmarkes.com): thirty-three isometric SVG figures that react to the pointer. Every page gets one, labelled like a figure in a paper. They also work inside a post. Drop a `div` into the Markdown:

<figure class="fig">
  <div class="fig-plate"><div data-hairline="hub" data-play="true"></div></div>
  <figcaption><b>Fig. 1</b><span class="live" data-live></span></figcaption>
</figure>

The caption on the right is live. Hairline describes what the figure is doing as you move over it.

## The portraits

The portrait on the front page is a different AI-generated version of me on every visit, an idea borrowed from [Sune Lehmann](https://sunelehmann.com). The ↻ button cycles through the rest.

## Everything else

| Thing | How |
| --- | --- |
| Dark mode | Follows your system; the toggle overrides it |
| Code | Highlighted at build time with Shiki |
| Footnotes | Plain Markdown[^1] |
| Feed | `/rss.xml`, generated on build |

---

That's it. The whole thing fits in your head, which is the point.

[^1]: Like this one. GitHub-flavoured Markdown is on by default.
