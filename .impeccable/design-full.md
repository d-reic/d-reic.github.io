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

## Overview

**Creative North Star: "The Corrected Draft"**

The site reads like an essay draft that has been through a careful reader's hands: clean typescript on paper, ruled lines, and a red pen that marks only what matters. Titles are set in a literary serif, everything said *about* the text (dates, roles, counts, captions) sits in a small, quiet sans, and the one red is the corrector's pen: a current page underlined, a margin note, a hovered title, a reading-progress stroke along the ruler. Blue is the editor's second pencil, kept for data.

It is a working document, not a brochure. Density is moderate and editorial: a 640px reading measure inside a 1080px page, long hairline-ruled lists instead of boxed grids where the content is a list, and generous vertical air (88px between sections). Personality comes from annotation and small surprises (the greeting with its red margin labels, the rotating portraits, the hanging seasonal ornament, the highlighter sweep across "typed by hand"), never from decoration for its own sake.

The visual vocabulary was first built around a radiology lightbox; that metaphor is retired. The tokens and components carry over unchanged, now read as paper, ink and correction marks. Radiology-specific imagery (lightbox figures, film references) is no longer a source of new motifs.

**Key Characteristics:**
- Cool off-white paper, near-black ink, one red pen, one blue pencil for data.
- Serif for what is written, sans for what is said about it.
- Flat: depth comes from paper tone and 1px ruled lines, never shadows.
- A tick-mark ruler as the signature divider and reading-progress bar.
- Annotations in red with a 1px tick, like marginal corrections.
- Light and dark themes; dark is the same draft read at night.

## Colors

A restrained, cool paper-and-ink palette where a single red does all the marking.

### Primary
- **Correction Red** (`correction-red`): the corrector's pen. Current-page underline in the nav, link and title hover, focus rings, text selection, margin labels on the greeting, the left rule on the "now" box, comments and blockquotes, reading progress, and filled level ticks. In dark mode it lightens to a soft coral (#f0837a) to keep contrast.
- **Correction Red Wash** (`correction-red-wash`): a ~9% tint of the red for faint fills, such as the default ornament fill.

### Secondary
- **Editor's Blue** (`editors-blue`): data only. Citation bars and chart marks; lightens to #7fa6cc in dark mode. Partial-year bars use a 135° hatch of the same blue.

### Tertiary
- **Highlighter Yellow** (`highlighter-yellow`): a single highlighter stroke across "typed by hand by an actual human" in the AI declaration. It sweeps in once when the footer enters view. Nowhere else.

### Neutral
- **Draft Paper** (`draft-paper`): the page background; header backdrop at 88% with a 10px blur. Dark: #0f1720.
- **Clean Sheet** (`clean-sheet`): raised surfaces: cards, chips, theme toggle, photo plates, post navigation. Dark: #15202b.
- **Typescript Ink** (`typescript-ink`): headings, body emphasis, the pressed toggle, tooltips (inverted). Dark: #e4eaee.
- **Faded Ink** (`faded-ink`): body copy in intros, nav links, list notes. Dark: #c0cad2.
- **Pencil Gray** (`pencil-gray`): metadata, captions, dates, footer links, the italic tagline. Dark: #8796a3.
- **Ruled Line** (`ruled-line`): 1px borders on cards and chips, list row dividers, section-title rule. Dark: #233140.
- **Margin Line** (`margin-line`): the stronger hairline: the ruler, underline color for links at rest, chart baseline, card hover border. Dark: #36475a.
- **Gutter Gray** (`gutter-gray`): code backgrounds (inline and blocks). Dark: #182532.

### Named Rules
**The One Red Pen Rule.** Red marks; it never fills. It appears as a line, a stroke, a label or a hover color, on a small fraction of any screen. No red buttons, red panels or red backgrounds.

**The Blue Is For Data Rule.** Editor's Blue is reserved for charts and data marks. Never use it for links, UI or decoration.

**The Real-Colours Exception.** Seasonal ornament flags (Swiss, Austrian) use their true colours in both themes; all other ornament fills are faint tints.

## Typography

**Display Font:** Newsreader (variable, optical sizing), with Iowan Old Style and Georgia as fallbacks
**Body Font:** Atkinson Hyperlegible Next, with system UI sans as fallback
**Label/Mono Font:** Atkinson Hyperlegible Mono for code; labels use the body face with tabular figures

**Character:** A literary serif for the written work set against a highly legible, accessibility-first sans for everything around it. The pairing reads as a manuscript with a careful editor's notes in the margin.

### Hierarchy
- **Display** (400, clamp(2.8rem, 6.6vw, 4.4rem), 0.98, −0.03em): page titles ("Research", "About"). The home greeting uses the same voice at clamp(2.7rem, 7.6vw, 4.3rem) / 0.92. Post titles: clamp(2.4rem, 5.8vw, 3.8rem) / 1.02, balanced.
- **Headline** (400, 2rem, 1.1, −0.015em): section titles, followed by a hairline that runs to the edge. In posts, h2 is 1.85rem / 1.2.
- **Title** (400, 1.2–1.4rem, ~1.2–1.3): card titles, publication titles, post-list titles, timeline roles, all serif. The brand in the header is serif at clamp(1.4rem, 3.2vw, 1.85rem) with an italic, gray tagline after a colon.
- **Body** (400, 17px, 1.62): default text. Intro paragraphs step up to 1.1rem / 1.68, the first one to 1.24rem in full ink. Prose in posts is 1.06rem / 1.75 at a 640px measure (~65ch); intros cap at 60ch.
- **Label** (400, 0.8–0.9rem, tabular numerals): dates, roles, counts, captions, figure numbers ("**Fig. 1**" bold in ink, the rest gray). Never uppercase, never letter-spaced.
- **Italic serif** (400 italic, 1.35–1.5rem): small headings with voice, like "Now" and year markers in lists.

### Named Rules
**The Serif-For-Writing Rule.** Anything that is a piece of writing (titles, headings, quotes, big numbers) is serif at weight 400. Anything that describes it (meta, captions, nav, labels) is sans. Serif is never bold; emphasis comes from size and ink, not weight.

**The No-Caps Rule.** No uppercase eyebrows or tracked-out labels. Small print stays in sentence case, gray, tabular.

## Layout

A single centred column: content max 1080px with a fluid gutter of clamp(16px, 4vw, 40px), and reading text held to a 640px measure. Page heads use a two-column grid (text + a 240–260px figure or portrait column) that collapses to one column below 760px, with the figure moving above the text on the home page.

Rhythm is vertical and generous: 56px above page heads, 88px above section titles, 22px below them, 120px before the footer. Lists (publications, posts, timelines) are full-width rows separated by 1px ruled lines with 14–16px padding, using a fixed left column for dates or a right column for counts (90–120px). Card grids are 3 columns (2 for selected publications) with 16px gaps, collapsing to 1 column at 760px.

The header is sticky, 72px tall, on translucent paper with a blur, and ends in the tick-mark ruler. On phones (≤600px) the name sits on its own line and the nav wraps underneath, with the theme toggle pushed right.

Breakpoints in use: 560px, 600px, 640px, 760px, 900px (the tagline hides below 900px).

## Elevation & Depth

The system is flat. There are no box shadows anywhere. Depth is tonal: Draft Paper below, Clean Sheet raised, separated by a 1px Ruled Line. Hover raises nothing; it changes a border to Faded Ink or Margin Line and turns a title red. The only layered elements are the sticky blurred header, the inverted ink tooltips on the citation chart, and the confetti easter egg.

### Named Rules
**The Flat Paper Rule.** Nothing casts a shadow. If something needs to stand apart, give it Clean Sheet and a 1px rule, or invert it to ink.

## Shapes

Near-square and drawn. Corners are 4px on cards, inline code and tooltips, 6px on figure plates, code blocks, images in prose and post navigation, 2px on chart bars and focus outlines. Pills (999px) are reserved for small controls: chips, the theme toggle, the easter-egg note.

Lines carry the form language: 1px hairlines for borders and row dividers, 2px strokes for red marks (nav underline, progress, left borders on notes and quotes). The tick-mark ruler (major ticks every 80px at 9px, minor every 16px at 4px) is the signature shape; horizontal rules in prose repeat it as a short 120px tick strip. Hairline drawings sit straight on the page with no plate; photos keep their plate.

## Components

### Navigation
Quiet and typographic. Sans 0.95rem, weight 500, in Faded Ink; hover turns red. The current page is full ink with a 2px red underline 6px below the text. Followed by the theme toggle and the ruler, which doubles as a reading-progress bar on posts.

### Theme Toggle
A pill of two 26×22px icon buttons on Clean Sheet with a 1px rule. The pressed state inverts to ink on paper. Three-state (system, light, dark) with an explicit `data-theme` override.

### Cards
- **Corner Style:** gently squared (4px)
- **Background:** Clean Sheet
- **Shadow Strategy:** none (see Elevation)
- **Border:** 1px Ruled Line; Faded Ink on hover, and the serif title turns red
- **Internal Padding:** 18px 20px 20px, min-height 170px on desktop, meta pinned to the bottom
- **Comment variant:** a note inside a card gets a 2px red left border, like a margin comment.

### Chips
- **Style:** 0.82rem sans, 3px 10px, pill, Clean Sheet with a 1px Ruled Line, Pencil Gray text, count at 60% opacity
- **State:** hover and current tag swap border and text to red; no fill change.

### Lists (publications, posts, timelines)
Full-width rows between 1px rules. Serif titles at ~1.2–1.35rem, sans meta in gray beneath, a fixed date column on the left or a citation count on the right (big serif numeral over a small gray label). Hover turns the title red. On phones the columns stack.

### Margin Annotation (signature)
The home greeting ("Hej! Salü! Servus!"): each word in display serif with a small red sans label beneath it, introduced by a 1px red tick, like a corrector's note on a draft. The "now" box follows the same idea: a 2px red left rule, an italic serif heading, and items introduced by short hairline dashes.

### Citation Chart
Editor's Blue bars (2px top corners) on a ruled grid with gray tabular axis labels. Hovering one column dims the others to 45% and shows an inverted ink tooltip; partial years are hatched. A collapsible table gives the same data.

### Figures
Caption row: bold "Fig. n" in ink, then a gray caption, live-updating for hairline figures. Portraits sit on a 4:5 plate and cross-fade with a slight scale when shuffled via the ↻ control.

### Inline Code & Code Blocks
Atkinson Hyperlegible Mono at 0.86em on Gutter Gray; blocks get 16px 18px padding, 6px corners and a 1px rule, with dual-theme syntax colors (GitHub light / GitHub dark dimmed).

## Do's and Don'ts

### Do:
- **Do** keep red to marks: 2px strokes, hovers, labels, focus rings, progress.
- **Do** set titles and headings in Newsreader at weight 400, and meta in Atkinson at 0.8–0.9rem gray with tabular figures.
- **Do** separate list content with 1px Ruled Lines instead of boxing every item.
- **Do** reuse the tick-mark ruler for dividers and progress.
- **Do** define every color as a token on `:root` and redefine it for dark mode, both under `prefers-color-scheme` and `[data-theme="dark"]`.
- **Do** respect `prefers-reduced-motion`: motion is removed entirely, and the highlighter shows fully drawn.
- **Do** keep the playful details (greeting annotations, portrait shuffle, seasonal ornament, highlighter, confetti) small and discoverable rather than central.

### Don't:
- **Don't** use shadows, gradients as decoration, or glassy cards (the header blur is the one exception).
- **Don't** use red or blue as a fill for buttons, panels or backgrounds.
- **Don't** use blue for anything other than data.
- **Don't** bold the serif or set labels in uppercase with letter-spacing.
- **Don't** add new radiology or lightbox motifs; the draft-and-correction metaphor replaces them.
- **Don't** add rounded corners above 6px except on pill-shaped controls.
