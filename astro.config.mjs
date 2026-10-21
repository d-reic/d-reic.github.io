// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Set `site` to your final URL (needed for RSS + sitemap).
// For a GitHub Pages project site (user.github.io/repo) also set `base: "/repo"`.
export default defineConfig({
  site: "https://d-reic.github.io",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
    },
  },
});
