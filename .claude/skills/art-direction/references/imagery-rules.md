# Master Imagery Rules

Applies to every style. Style guides may tighten these rules, never loosen them.

## Slots & aspect ratios

| Slot | Aspect | Role | Notes |
|---|---|---|---|
| `palette.options[].hero` | **21:9** | Full-bleed banner atop a palette option | One environment, one light condition. Seedream 4.5 (only photoreal model with 21:9). |
| `palette.options[].gallery[]` | **4:5** (occasionally 1:1) | Mood-board tiles, rendered as an HTML grid | 4–6 tiles per board: mix of detail / material / tablescape / atmosphere. Boards are NEVER a single generated collage. |
| `palette.options[].board` | — | **Legacy only** (single scanned/AI collage, `hasBakedText`) | Never create new ones. |
| `cover.background` | **21:9** | Full-bleed cover atmosphere behind HTML type + scrim | Must survive the renderer's dark scrim (top + bottom gradients); keep the lower third quiet — the name block sits there. No focal subject center-frame. |
| `vision.image` | **21:9** | Full-width editorial spread under the vision narrative | The thesis image of the whole document — one establishing frame that *is* the concept. Rendered with a figure caption from `alt`. |
| `venues.items[].image` | **3:2** | Right column of the numbered venue row | **Atmospheric direction only — never claimed as the actual venue.** See venue-honesty rule below. |
| `moments.items[].image` | **3:2** | Image-led vignette above the moment title | Suggestive, not literal — the *feeling* of the moment. Not every moment needs one; 2–3 per document is the ceiling. |
| `custom.image` | **21:9** | Chapter frontispiece between the opener and the items | One establishing frame that argues the chapter's point (e.g. the rain plan's glowing tent). Caption from `alt`. |
| `custom.items[].image` | **3:2** | Image-led vignette (vignettes variant only) | Same rules as moments vignettes. `index`/`schedule` variants take no images. |
| `closing.texture` | **21:9** | Abstract closing-page texture behind a heavy bg-tint scrim | Material close-up (silk, stone, smoke, petals); near-abstract. It reads at ~15% strength — favor texture over subject. |

## Structure rule — the image leads the section

Imagery is structural, not decorative. Covers, vision spreads, venue rows and moment
vignettes are *led* by their image: the type is set in relation to it. A proposal
with imagery only in the palette section is under-directed — walk the client through
the ideas visually.

## Dark-theme rule (HARD)

If the document theme has a dark ground (noir, or any custom theme with a dark `bg`):
**every image must be dark-field and full-bleed.** No white backgrounds, no light
studio sweeps, no daylight-on-white product shots — a bright rectangle on a dark page
reads as a hole in the document. Append to negatives for every dark-theme prompt:

```
white background, light background, bright background, studio product shot, studio backdrop
```

and state the ground in the prompt itself ("on near-black ground", "surrounded by
darkness", "the scene falls off into shadow").

## Venue-honesty rule (HARD)

Generated venue imagery is **art direction, not documentation**. Never present a
generated image as a photograph of the named venue. Prompts describe the *mood and
material language* the venue shares with the brief ("vaulted brick cellar in amber
light" — not "The Django"). The image `alt` must carry the honesty language, e.g.
`"Atmosphere direction for The Django — vaulted brick, amber stage light"`, because
the renderer prints `alt` as the visible figure caption.

## Real-venue pipeline — linked listings & uploads

Reality first, generation second. When a venue is linked to its Google Business
Profile / Places listing (or the client supplies photos), **real interiors replace
generated atmosphere** in venue slots:

- Imported photos carry `source: "google"` (or `"upload"`) and keep the photographer
  credit in `attribution` — the renderer prints it as a "Photo: …" caption suffix.
  Never hotlink Google URLs; the import route persists a copy first.
- Real photos are exempt from the dark-theme rule's *negatives* (they're photographs),
  but not from its *judgment*: a bright daylight interior still reads as a hole in a
  noir document — prefer the listing's evening/low-light shots, or run the
  standardize pass below.

**Standardize → dress.** The workflow for showing a real room wearing the event:

1. **Standardize** — image-to-image regrade of the real photo into the document's
   palette and light. Geometry, architecture, and furnishings stay untouched; only
   the treatment moves. Prompt names the target tokens ("regrade to plum-black and
   brass, candlelight temperature"), negatives as usual.
2. **Dress** — image-to-image over the real room adding the event's installations
   ("one long supper table, taper candles, dark florals, brass accents"). One
   dressing idea per pass; iterate takes rather than stacking clauses.

**Dressed-render honesty (HARD).** A dressed or regraded output is a *concept render*,
not a photograph. Its `alt` must say so —
`"Concept render over the actual room at The Django — dressed for the supper club"` —
and the untouched source photo stays in the slot's take history. Never present a
dressed render as documentation of what the venue looks like.

## Composition canon

- **One idea per image.** If the prompt needs "and", cut one.
- **Editorial camera:** 35–50mm feel for interiors, 85–100mm feel for details; shallow
  depth on details, deep focus on rooms. Name the framing in the prompt ("wide
  symmetrical interior", "macro detail, shallow depth of field").
- **Negative space is a feature** — heroes carry HTML type overlays; keep at least one
  quiet third of the frame.
- **People are atmosphere, not subjects:** backs, hands, silhouettes, motion blur,
  distance. Empty rooms "moments before guests arrive" are the house signature.
- **No literal event clichés** unless the style guide asks: no balloon arches, no
  sparkler tunnels, no champagne-tower splash frames.

## Lighting canon

Default to **motivated practical light**: candles, table lamps, window light, festoons,
stage wash — light that could exist in the room. Name the light source and its
temperature in every prompt. Never "studio lighting", never flat e-commerce light.

## Realism bar

Photographic by default ("cinematic photograph", "editorial photograph, film grain").
Illustration only where a style guide explicitly allows it (festival paper-goods
textures). If a generation looks AI-slick — waxy surfaces, impossible bokeh, melted
geometry — regenerate; never ship it because it's close.

## Negative canon

Append to every prompt's negatives, plus style-specific additions:

```
text, letters, typography, signage, watermark, logo, caption,
deformed hands, extra fingers, distorted faces,
oversaturated, HDR halo, plastic skin, CGI render look
```

Add `people, faces` for any empty-space shot.

## Naming, persistence, manifest

- Files: `public/library/<style>/<slot>--<slug>--t<take>.png`
  e.g. `public/library/noir/hero--supper-club-candlelight--t2.png`.
- Persist **immediately** on job completion (Higgsfield URLs die in ~1h). Prod:
  Vercel Blob under `library/<style>/…`; the Blob URL is what enters documents.
- Every generation appends to `public/library/<style>/manifest.json`:

```json
{
  "file": "hero--supper-club-candlelight--t2.png",
  "slot": "palette.hero",
  "style": "noir",
  "model": "seedream_v4_5",
  "aspect": "21:9",
  "prompt": "…full prompt…",
  "negatives": ["…"],
  "alt": "…",
  "credits": 8,
  "createdAt": "2026-07-16T00:00:00Z",
  "keep": true
}
```

`keep: false` marks rejected takes (kept on disk for the filmstrip, excluded from
library pickers).
