---
name: art-direction
description: Art-directs all generated imagery for KJ Events proposals — style guides, Higgsfield prompt templates, model/aspect selection, credit discipline, and persistence conventions. Use whenever generating, regenerating, or reviewing proposal imagery, or when writing imagery prompts/`setImagery` requests.
---

# KJ Events — Art Direction

You are art-directing imagery for client-facing event proposals at Kira Jia Events, a
boutique NYC event & wedding studio. Every image must look like it belongs in a printed
luxury proposal deck — editorial, specific, unhurried. Never stock-photo generic, never
AI-slick.

## Workflow

1. **Identify the style** governing the proposal (its `theme.style`):
   `classic-kj` · `noir` · `botanical` · `editorial` · `festival`.
   Read the matching `references/style-<name>.md` before writing any prompt.
2. **Identify the slot** being filled and take its aspect ratio + composition rules
   from `references/imagery-rules.md`.
3. **Build the prompt** from the style guide's template for that shot type: template
   skeleton + the event's specifics (venue character, palette names, florals, season)
   + the style's mood lexicon. Always append the canon negatives.
4. **Pick the model** per `references/operations.md` (short version: Seedream 4.5 for
   wide/interior/tablescape/texture, Soul 2.0 for editorial shots with people).
5. **Generate → persist → record.** Higgsfield URLs expire in ~1 hour: download the
   asset immediately to `public/library/<style>/` (dev) or Vercel Blob (prod), and
   append the manifest entry. Never store a Higgsfield URL in a proposal document.

## Hard rules (non-negotiable)

- **NEVER bake text into an image.** No signage, lettering, menus, invitations,
  monograms, numerals. All typography is HTML overlay. Every prompt's negatives
  include `text, letters, typography, signage, watermark, logo`. (The legacy
  reference-deck images with glitched baked text are grandfathered via
  `hasBakedText: true` — never create new ones.)
- **No recognizable faces as subjects.** People appear as atmosphere — turned away,
  motion-blurred, distant, cropped. Never generate a likeness of a real client.
- **Palette obedience.** The image's dominant tones must sit inside the style's token
  palette; name the hex families in the prompt ("deep plum-black, brass, oxblood").
- **One idea per image.** A hero is one room, one moment, one light condition — not a
  collage. Boards are composed in HTML from individually generated gallery tiles.
- **Alt text always** — written for the client, not the generator ("Candlelit supper
  club interior in plum black and brass"), and carried in the `ImageAsset`.

## References

- `references/imagery-rules.md` — slots, aspect ratios, composition & lighting canon,
  negative canon, naming + manifest conventions, real-venue pipeline
  (linked listings → standardize → dress).
- `references/chapter-composition.md` — how a document is composed: chapters not
  lists, the component vocabulary (registers, schedules, spines, exhibits, quotes),
  narrative arc, no-stone-unturned rules. Read when authoring or restructuring
  proposal content, not just imagery.
- `references/operations.md` — Higgsfield model selection, quality tiers, credit
  discipline, dev (MCP) vs prod (Cloud API) flows.
- `references/style-classic-kj.md` · `style-noir.md` · `style-botanical.md` ·
  `style-editorial.md` · `style-festival.md` — per-style palette, typography, mood
  lexicon, prompt templates, shot lists.
