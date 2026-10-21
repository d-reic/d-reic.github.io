// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync } from "node:fs";

// The blog index stays out of the sitemap (and is noindex) until there is a post.
const hasPosts = readdirSync("src/content/blog").some((f) => f.endsWith(".md"));

// Set `site` to your final URL (needed for RSS + sitemap).
// For a GitHub Pages project site (user.github.io/repo) also set `base: "/repo"`.
export default defineConfig({
  site: "https://danielreichenpfader.com",
  integrations: [sitemap({ filter: (page) => hasPosts || !page.endsWith("/blog/") })],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
    },
  },
});
