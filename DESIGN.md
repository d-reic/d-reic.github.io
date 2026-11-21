---
name: Daniel Reichenpfader · Working Notes
description: A personal academic site that reads like a corrected essay draft.
colors:
  draft-paper: "#eef1f0"
  clean-sheet: "#f7f9f8"
  typescript-ink: "#17212b"
  faded-ink: "#364350"
  pencil-gray: "#5b6672"
  ruled-line: "#d2d9dc"
  margin-line: "#a9b4ba"
  correction-red: "#b3262c"
  correction-red-wash: "#b3262c17"
  gutter-gray: "#e3e8e8"
  editors-blue: "#2b5578"
  highlighter-yellow: "#f6d55c"
typography:
  display:
    fontFamily: "Newsreader Variable, Newsreader, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.8rem, 6.6vw, 4.4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Newsreader Variable, Newsreader, Iowan Old Style, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Newsreader Variable, Newsreader, Iowan Old Style, Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.62
  prose:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Atkinson Hyperlegible Next, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "tnum"
  mono:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.86em"
    fontWeight: 400
rounded:
  hair: "2px"
  sm: "4px"
  md: "6px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  text-measure: "640px"
  wide: "1080px"
  grid-gap: "16px"
  row: "14px"
  section: "88px"
  page-top: "56px"
  footer-top: "120px"
components:
  card:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.typescript-ink}"
    rounded: "{rounded.sm}"
    padding: "18px 20px 20px"
  card-hover:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.correction-red}"
  chip:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.pencil-gray}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  chip-active:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.correction-red}"
    rounded: "{rounded.pill}"
  nav-link:
    textColor: "{colors.faded-ink}"
    typography: "{typography.body}"
  nav-link-current:
    textColor: "{colors.typescript-ink}"
  theme-toggle:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.pencil-gray}"
    rounded: "{rounded.pill}"
    padding: "2px"
  theme-toggle-pressed:
    backgroundColor: "{colors.typescript-ink}"
    textColor: "{colors.draft-paper}"
    rounded: "{rounded.pill}"
  inline-code:
    backgroundColor: "{colors.gutter-gray}"
    textColor: "{colors.typescript-ink}"
    rounded: "{rounded.sm}"
    padding: "0.12em 0.35em"
  tooltip:
    backgroundColor: "{colors.typescript-ink}"
    textColor: "{colors.draft-paper}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  data-bar:
    backgroundColor: "{colors.editors-blue}"
    rounded: "{rounded.hair}"
---

# Design System: Daniel Reichenpfader · Working Notes

<!-- impeccable:design-map -->
Name: Daniel Reichenpfader · Working Notes
Colors: primary: correction-red #b3262c; secondary: editors-blue #2b5578; tertiary: highlighter-yellow #f6d55c; neutral: draft-paper #eef1f0; primary: correction-red-wash #b3262c17 (+7 more in the sidecar)
Fonts: Newsreader Variable (display, headline, title); Atkinson Hyperlegible Next (body, prose, label); Atkinson Hyperlegible Mono (mono)
Spacing: gutter clamp(16px, 4vw, 40px), text-measure 640px, wide 1080px, grid-gap 16px, row 14px, section 88px, page-top 56px, footer-top 120px
Radius: hair 2px, sm 4px, md 6px, pill 999px
North Star: "The Corrected Draft"
Rules:
- The One Red Pen Rule. Red marks; it never fills.
- The Blue Is For Data Rule. Editor's Blue is reserved for charts and data marks.
- The Serif-For-Writing Rule. Anything that is a piece of writing (titles, headings, quotes, big numbers) is serif at weight 400.
- The No-Caps Rule. No uppercase eyebrows or tracked-out labels.
- The Flat Paper Rule. Nothing casts a shadow.
Don't:
- Don't use shadows, gradients as decoration, or glassy cards (the header blur is the one exception).
- Don't use red or blue as a fill for buttons, panels or backgrounds.
- Don't use blue for anything other than data.
- Don't bold the serif or set labels in uppercase with letter-spacing.
- Don't add new radiology or lightbox motifs; the draft-and-correction metaphor replaces them.
- Don't add rounded corners above 6px except on pill-shaped controls.
Do:
- Do keep red to marks: 2px strokes, hovers, labels, focus rings, progress.
- Do set titles and headings in Newsreader at weight 400, and meta in Atkinson at 0.8–0.9rem gray with tabular figures.
- Do separate list content with 1px Ruled Lines instead of boxing every item.
- Do reuse the tick-mark ruler for dividers and progress.
- Do define every color as a token on `:root` and redefine it for dark mode, both under `prefers-color-scheme` and `[data-theme="dark"]`.
- Do respect `prefers-reduced-motion`: motion is removed entirely, and the highlighter shows fully drawn.
- Do keep the playful details (greeting annotations, portrait shuffle, seasonal ornament, highlighter, confetti) small and discoverable rather than central.
Full: .impeccable/design-full.md (read a section when you need its detail)
