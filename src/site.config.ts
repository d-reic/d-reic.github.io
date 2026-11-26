// Everything personal lives here. Edit this file first.

export const site = {
  name: "Daniel Reichenpfader",
  shortName: "Daniel",
  // The italic half of the header, like Sune's "Intermittent Updates".
  tagline: "Working Notes",
  // Search results: the home page title and the default description.
  seoTitle: "Daniel Reichenpfader · Clinical NLP & AI in Healthcare",
  description:
    "Daniel Reichenpfader is a tenure-track lecturer at Bern University of Applied Sciences (BFH), researching clinical NLP and large language models in healthcare.",
  role: "Tenure-track lecturer at Bern University of Applied Sciences",
  location: "Switzerland",

  // Home page intro. Plain HTML is allowed.
  bio: [
    `<span class="hello"><span>Hej!<small>Swedish</small></span> <span>Salü!<small>Swiss German</small></span> <span>Servus!<small>Austrian</small></span></span> I'm Daniel, a researcher, lecturer, app developer and facilitator with a focus on
     eHealth and well-being.`,
    `I teach at <a href="https://www.bfh.ch">Bern University of Applied Sciences</a>
     and am about to finish my PhD at the Université de Genève on natural language processing in
     radiology. More broadly, I'm trying to make healthcare more accessible and efficient with AI and NLP.`,
  ],

  // About page intro: the longer story, so it doesn't repeat the home bio. Plain HTML is allowed.
  aboutBio: [
    `I'm Daniel. I started in medical informatics in Graz, spent exchange semesters in Bern and
     Jönköping (hence the Salü! and the Hej!), and have built health software ever since: Android apps
     at Solgenium, research on clinical NLP and conversational agents at BFH, and a PhD at the
     Université de Genève on natural language processing in radiology.`,
    `Today I'm a tenure-track lecturer at <a href="https://www.bfh.ch">Bern University of Applied Sciences</a>,
     where I teach clinical apps, quality management, user-centered design and the practical use of
     generative AI. On the side I build apps like AMRAP and Gluscht, play the harp as Der Harfenist, and
     I'm about to start my own company for facilitation and digital experience engineering.`,
  ],

  // A small "now" box (nownownow.com style). Set to null to hide it.
  now: {
    updated: "2026-10-21",
    items: [
      "Settling into my new role as tenure-track lecturer at BFH.",
      "Wrapping up my PhD on natural language processing in radiology.",
      "Building <a href=\"https://amrap-app.com\">AMRAP</a>, an iOS app for box fitness athletes.",
    ],
  },

  links: [
    { label: "Email", href: "mailto:hello@danielreichenpfader.com" },
    { label: "ORCID", href: "https://orcid.org/0000-0002-8052-3359" },
    { label: "Scholar", href: "https://scholar.google.com/citations?user=bK0aJXwAAAAJ" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-reichenpfader/" },
    { label: "Instagram", href: "https://www.instagram.com/d_reic/" },
    { label: "RSS", href: "/rss.xml" },
  ],

  // Transparency note in the footer (adapted from sunelehmann.com). HTML allowed.
  aiDeclaration: `<b>AI declaration:</b> Every blog post is <mark class="hl">typed by hand by an actual human</mark> (me):
    ten fingers, too much coffee, and the occasional typo as a certificate of authenticity. AI may proofread,
    but it doesn't get the keyboard. The site itself was built with AI (Claude Code), and the portraits are
    AI-generated from a photo of me. Kudos to <a href="https://sunelehmann.com">Sune Lehmann</a> for the idea
    of AI portraits in different costumes (press ↻ next to my photo) and for this declaration. The moving
    line drawings are from <a href="https://hairline.lucasmarkes.com">hairline</a>.`,

  // Shown first on the Research page, in this order. DOIs from your ORCID list.
  selectedPublications: [
    "10.1038/s41746-024-01219-0",
    "10.2196/68998",
    "10.1016/j.jbi.2023.104336",
    "10.3390/higheredu2040039",
  ],

  // Research page: talks and invited lectures, newest first. The section hides while empty.
  // kind is a short label, e.g. "Invited talk", "Conference talk", "Guest lecture", "Keynote".
  talks: [] as { when: string; kind: string; title: string; event: string; note?: string; href?: string }[],

  // Privacy-friendly, cookie-free visitor counts (goatcounter.com, as on sunelehmann.com).
  // Set to your site code, e.g. "danielreichenpfader" for danielreichenpfader.goatcounter.com.
  goatcounter: "dareic" as string | null,

  nav: [
    { label: "Research", href: "/research/" },
    { label: "Teaching", href: "/teaching/" },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
  ],

  // About page: karpathy.ai-style timelines. Newest first.
  experience: [
    { when: "2026–now", what: "Tenure-track Lecturer", where: "Bern University of Applied Sciences", note: "" },
    { when: "2025", what: "HORIZON Europe Expert", where: "European Commission", note: "Evaluating project proposals for the HORIZON Europe programme." },
    { when: "2022–2026", what: "Research Associate", where: "Bern University of Applied Sciences", note: "Research projects on clinical NLP, conversational agents and AI-based tools for higher education." },
    { when: "2020–2022", what: "R&D Assistant", where: "Solgenium", note: "Android development, stakeholder analyses and research proposals." },
    { when: "2018–2019", what: "Student Trainee", where: "AVL List", note: "Maintaining and assembling hard- and software, company- and worldwide." },
  ],
  education: [
    { when: "2023–2026", what: "PhD in Life Sciences", where: "Université de Genève", note: "Natural language processing in radiology. Nearly done." },
    { when: "2020–2022", what: "MSc Information Management", where: "FH JOANNEUM, Austria", note: "Specialisation in software and digital experience engineering." },
    { when: "2021–2022", what: "Exchange semester", where: "Jönköping University, Sweden", note: "Mobile development, iOS, semantic web technologies." },
    { when: "2017–2020", what: "BSc Medical Informatics", where: "FH JOANNEUM, Austria", note: "Specialisation in digital personal assistance systems." },
    { when: "2019–2020", what: "Exchange semester", where: "Bern University of Applied Sciences", note: "Usability testing, augmented reality, medical data integration." },
  ],
  projects: [
    { name: "AMRAP: WOD Logs & PRs", note: "Native iOS app for box fitness athletes.", links: [{ label: "Website", href: "https://amrap-app.com" }, { label: "App Store", href: "https://apps.apple.com/ch/app/amrap-wod-log-prs/id6743651394" }] },
    { name: "Gluscht", note: "Nutrition coaching app for iPhone and the web. Turns your coach's meal plan into a daily schedule. In pilot.", links: [{ label: "Website", href: "https://danielreichenpfader.com/gluscht/" }] },
    { name: "Tandemy", note: "iOS app for tandem language learning: a split-session timer that switches languages halfway, a shared notebook for words and corrections, and flashcards between sessions. In development.", links: [] },
    { name: "How Many Tokens?", note: "Turns an LLM token count into things you know: copies of famous books, a stack of printed paper next to landmarks, and hours of reading. Type a number, everything recomputes.", links: [{ label: "Try it", href: "https://danielreichenpfader.com/token-visualizer/" }] },
    { name: "Solution", note: "Browser game about a machine-press operator in a German factory, 1941. The score rewards working fast and asking nothing. Inspired by Gabrielle Zevin's Tomorrow, and Tomorrow, and Tomorrow. In German.", links: [{ label: "Play", href: "https://danielreichenpfader.com/solution/" }] },
    { name: "SkillSpector Web", note: "Checks AI agent skills for prompt injection, data exfiltration and malicious code before you install them. Paste a link, upload or paste a SKILL.md and get a verdict, a risk score and the findings. Built on NVIDIA SkillSpector.", links: [{ label: "Try it", href: "https://skill-scanner.danielreichenpfader.com/" }] },
    { name: "bpmn-ai", note: "A BPMN 2.0 modeler with an AI assistant, built on bpmn.io. Describe a process and get a diagram you can edit, check and export.", links: [{ label: "Try it", href: "https://bpmn-ai.fly.dev" }] },
    { name: "Der Harfenist", note: "Harp music for your event.", links: [{ label: "Website", href: "https://der-harfenist.ch" }] },
    { name: "Facilitation & Digital Experience Engineering", note: "About to start my own company. Stay tuned!", links: [] },
  ],
  // Teaching page. From the BFH profile: bfh.ch/en/daniel-reichenpfader
  teaching: {
    profile: "https://www.bfh.ch/en/about-bfh/people/dsgj475q4xyr/",
    programmes: [
      { name: "BSc Medical Informatics", href: "https://www.bfh.ch/en/studies/bachelor/medical-informatics/", where: "BFH School of Engineering and Computer Science" },
      { name: "BFH-Diagonal", href: "https://www.bfh.ch/en/studies/additional-certificates/bfh-diagonal/", where: "Interdisciplinary electives open to all BFH students" },
      { name: "Digitalization and transformation in healthcare", href: "https://www.bfh.ch/de/weiterbildung/fachkurse-sas/digitalisierung-und-transformation-im-gesundheitswesen/", where: "BFH School of Health Professions" },
      { name: "CAS KI – Grundlagen und Anwendung", href: "https://www.bfh.ch/de/weiterbildung/cas/kuenstliche-intelligenz-grundlagen-und-anwendung/", where: "Continuing education, BFH School of Engineering and Computer Science" },
    ],
    modules: [
      { name: "Clinical apps", subtitle: "Designing and building mobile apps for clinical use.", role: "Course lead", note: "" },
      { name: "Quality management in healthcare", subtitle: "Quality frameworks, processes and measurement in healthcare organisations.", role: "Course lead", note: "" },
      { name: "Optimize your studies with genAI", subtitle: "Using generative AI for learning, writing and research, responsibly.", role: "Course lead", note: "" },
      { name: "User-Centered Design", subtitle: "Designing health software with and for the people who use it.", role: "Course lead", note: "" },
      { name: "ASU Research internship", subtitle: "Guiding students through a research project of their own.", role: "Co-teaching", note: "" },
      { name: "Effective prompting and AI interaction", subtitle: "Writing prompts that get reliable results from language models.", role: "Co-teaching", note: "" },
    ],
  },
  interests: ["Large language models in medicine", "Clinical NLP", "Data science", "Mobile app development"],
  skills: [
    "LLMs", "BERTopic", "Python", "Swift", "Android", "Firebase", "Docker", "Git", "Linux", "LaTeX",
    "User-centered design", "Usability testing", "Qualitative research", "Project management", "Facilitation",
  ],
};

// The rotating AI portraits (idea: sunelehmann.com). The first one always shows
// on load and the ↻ button cycles through the rest in a shuffled order. Only entries whose file
// exists in /public are shown; prompts for each one are in PORTRAITS.md, and
// `npm run portraits <folder>` crops and resizes them into /public/portraits.
export const portraits: { src: string; caption: string }[] = [
  { src: "/portraits/original.jpg", caption: "the original" },
  { src: "/portraits/radiologist.jpg", caption: "reading an X-ray" },
  { src: "/portraits/athlete.jpg", caption: "mid-WOD" },
  { src: "/portraits/harpist.jpg", caption: "as a concert harpist" },
  { src: "/portraits/astronaut.jpg", caption: "as an astronaut" },
  { src: "/portraits/alphorn.jpg", caption: "with an alphorn" },
  { src: "/portraits/tracht.jpg", caption: "in Austrian Tracht" },
  { src: "/portraits/viking.jpg", caption: "as a Viking" },
  { src: "/portraits/beekeeper.jpg", caption: "as a beekeeper" },
  { src: "/portraits/ski-instructor.jpg", caption: "as a ski instructor" },
  { src: "/portraits/chef.jpg", caption: "as a chef" },
  { src: "/portraits/professor-1920.jpg", caption: "as a 1920s professor" },
  { src: "/portraits/hacker-1984.jpg", caption: "as a 1984 hacker" },
];

// Shown until at least one real portrait exists.
export const placeholderPortraits: { src: string; caption: string }[] = [
  { src: "/portraits/astronaut.svg", caption: "as an astronaut" },
  { src: "/portraits/beekeeper.svg", caption: "as a beekeeper" },
  { src: "/portraits/cartographer.svg", caption: "as a cartographer" },
  { src: "/portraits/chef.svg", caption: "as a chef" },
  { src: "/portraits/diver.svg", caption: "as a deep-sea diver" },
  { src: "/portraits/painter.svg", caption: "as a painter" },
];
