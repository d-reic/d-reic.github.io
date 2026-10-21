// Everything personal lives here. Edit this file first.

export const site = {
  name: "Daniel Reichenpfader",
  shortName: "Daniel",
  // The italic half of the header, like Sune's "Intermittent Updates".
  tagline: "Working Notes",
  description:
    "Daniel Reichenpfader's personal site: research, projects and occasional essays.",
  role: "Your role · Your institution", // TODO
  location: "Switzerland", // TODO

  // Home page intro. Plain HTML is allowed.
  bio: [
    `Hi, I'm Daniel. This is my corner of the internet, where I keep notes on what I'm working on,
     what I'm reading, and the occasional idea that doesn't fit anywhere else.`,
    `<em>Replace this with two or three sentences about yourself</em>: what you do, where, and what
     you care about. Edit it in <code>src/site.config.ts</code>.`,
  ],

  // A small "now" box (nownownow.com style). Set to null to hide it.
  now: {
    updated: "2026-10-21",
    items: [
      "Building this website and writing the first few posts.",
      "Reading: <em>a book you're reading</em>.",
      "Thinking about: <em>a question on your mind</em>.",
    ],
  },

  links: [
    { label: "Email", href: "mailto:you@example.com" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "Scholar", href: "https://scholar.google.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "RSS", href: "/rss.xml" },
  ],

  // Transparency note in the footer (adapted from sunelehmann.com). HTML allowed.
  aiDeclaration: `<b>AI declaration:</b> The posts are written by me, by hand; AI may proofread, but it
    doesn't write. The site itself was built with AI (Claude Code), and the portraits are AI-generated
    from a photo of me. The moving line drawings are from <a href="https://hairline.lucasmarkes.com">hairline</a>.`,

  nav: [
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
  ],

  // About page: a karpathy.ai-style timeline. Newest first.
  timeline: [
    { when: "2024 — now", what: "Current position", where: "Organisation", note: "One line on what you do there." },
    { when: "2021 — 2024", what: "Previous position", where: "Organisation", note: "" },
    { when: "2019 — 2021", what: "MSc, Your Field", where: "University", note: "Thesis on something interesting." },
    { when: "2016 — 2019", what: "BSc, Your Field", where: "University", note: "" },
  ],
  interests: ["Interest one", "Interest two", "Interest three", "Interest four"],
};

// The rotating AI portraits. One is picked at random on every visit and the
// ↻ button cycles through the rest. Drop your images into /public/portraits
// and list them here (see README for a prompt recipe).
export const portraits: { src: string; caption: string }[] = [
  { src: "/portraits/astronaut.svg", caption: "as an astronaut" },
  { src: "/portraits/beekeeper.svg", caption: "as a beekeeper" },
  { src: "/portraits/cartographer.svg", caption: "as a cartographer" },
  { src: "/portraits/chef.svg", caption: "as a chef" },
  { src: "/portraits/diver.svg", caption: "as a deep-sea diver" },
  { src: "/portraits/painter.svg", caption: "as a painter" },
];
