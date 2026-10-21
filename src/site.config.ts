// Everything personal lives here. Edit this file first.

export const site = {
  name: "Daniel Reichenpfader",
  shortName: "Daniel",
  // The italic half of the header, like Sune's "Intermittent Updates".
  tagline: "Working Notes",
  description:
    "Daniel Reichenpfader: researcher, app developer and project manager working on eHealth, NLP and AI.",
  role: "Research Associate · Bern University of Applied Sciences",
  location: "Switzerland",

  // Home page intro. Plain HTML is allowed.
  bio: [
    `Hej! Salü! Servus! I'm Daniel, a researcher, app developer and project manager with a focus on
     eHealth and well-being.`,
    `I'm a research associate at <a href="https://www.bfh.ch">Bern University of Applied Sciences</a>
     and a PhD candidate at the Université de Genève, working on natural language processing in
     radiology. More broadly, I'm trying to make healthcare more accessible and efficient with AI and NLP.`,
  ],

  // A small "now" box (nownownow.com style). Set to null to hide it.
  now: {
    updated: "2026-10-21",
    items: [
      "Research on clinical NLP, conversational agents and AI tools for higher education.",
      "PhD on natural language processing in radiology.",
      "Building <a href=\"https://amrap.danielreichenpfader.com\">AMRAP</a>, an iOS app for box fitness athletes.",
    ],
  },

  links: [
    { label: "Email", href: "mailto:hello@danielreichenpfader.com" },
    { label: "ORCID", href: "https://orcid.org/0000-0002-8052-3359" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-reichenpfader/" },
    { label: "Instagram", href: "https://www.instagram.com/d_reic/" },
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

  // About page: karpathy.ai-style timelines. Newest first.
  experience: [
    { when: "2025", what: "HORIZON Europe Expert", where: "European Commission", note: "Evaluating project proposals for the HORIZON Europe programme." },
    { when: "2022 — now", what: "Research Associate", where: "Bern University of Applied Sciences", note: "Research projects on clinical NLP, conversational agents and AI-based tools for higher education." },
    { when: "2020 — 2022", what: "R&D Assistant", where: "Solgenium", note: "Android development, stakeholder analyses and research proposals." },
    { when: "2018 — 2019", what: "Student Trainee", where: "AVL List", note: "Maintaining and assembling hard- and software, company- and worldwide." },
  ],
  education: [
    { when: "2023 — now", what: "PhD in Life Sciences", where: "Université de Genève", note: "Natural language processing in radiology." },
    { when: "2020 —", what: "MSc Information Management", where: "FH JOANNEUM, Austria", note: "Specialisation in software and digital experience engineering." },
    { when: "2021 — 2022", what: "Exchange semester", where: "Jönköping University, Sweden", note: "Mobile development, iOS, semantic web technologies." },
    { when: "2017 — 2020", what: "BSc Medical Informatics", where: "FH JOANNEUM, Austria", note: "Specialisation in digital personal assistance systems." },
    { when: "2019 — 2020", what: "Exchange semester", where: "Bern University of Applied Sciences", note: "Usability testing, augmented reality, medical data integration." },
  ],
  projects: [
    { name: "AMRAP: WOD Logs & PRs", note: "Native iOS app for box fitness athletes.", links: [{ label: "Website", href: "https://amrap.danielreichenpfader.com" }, { label: "App Store", href: "https://apps.apple.com/ch/app/amrap-wod-log-prs/id6743651394" }] },
    { name: "Der Harfenist", note: "Harp music for your event.", links: [{ label: "Website", href: "https://der-harfenist.ch" }] },
    { name: "Facilitation & Digital Experience Engineering", note: "About to start my own company. Stay tuned!", links: [] },
  ],
  interests: ["Large language models in medicine", "Clinical NLP", "Data science", "Mobile app development"],
  skills: ["LLMs", "Python", "Swift", "Firebase", "Docker", "Linux", "LaTeX"],
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
