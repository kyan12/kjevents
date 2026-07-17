# Chapter Composition — sections are chapters, not lists

How a proposal document is *composed*, section by section. The renderer gives every
section a chapter opener (running head, folio, ghost numeral); this guide is about
what happens **under** the opener. The failure mode it exists to prevent: every
section rendering as "a heading and a list." A chapter earns its page by mixing
components — prose, figure, register, table, quote — chosen for what that chapter
is arguing.

## The document is a narrative arc

A proposal walks a client from feeling to commitment. The chapters serve that order:

1. **Cover** — the promise, one image, four facts.
2. **Vision** — the argument in prose. Thesis image. One pull quote if a single line
   carries the pitch.
3. **Art direction (palette)** — the look as evidence: hero, tiles, color plates.
4. **The place (venues)** — candidates as numbered rows, each with image + spec strip.
5. **The feeling (moments)** — image-led vignettes; what the guests will remember.
6. **The mechanics (run of show, staffing, logistics, calendar, contingency)** — the
   no-stone-unturned middle. This is where trust is won: thorough, structured, never
   verbose.
7. **The money (investment)** — the typeset exhibit. No surprises after chapter 6.
8. **The commitment (scope, closing)** — what the fee covers, grouped; then the ask.

Not every document needs every chapter — but a document with no mechanics chapters
reads as a mood board, and one with no feeling chapters reads as an invoice.

## Component vocabulary

| Component | Schema hook | Use for |
|---|---|---|
| Narrative prose | `body` (vision, custom) | Arguments. First paragraph sets display-scale. |
| Pull quote | `quote` (vision, custom) | The one line the client should repeat to their partner. ≤1–2 per document. |
| Frontispiece | `image` (vision, custom) | The chapter's establishing frame, 21:9, captioned. |
| Fact column / strip | `facts` (vision, venue items) | Specifications: capacity, rigging, dress code. Label + value, tabular. |
| Numbered rows | venues `items` | Compared candidates — image, prose, spec strip per row. |
| Vignettes | moments / custom `variant: "vignettes"` | Image-led memories; 2–3 images per document ceiling. |
| Index register | custom `variant: "index"` + item `meta` | Dense two-column checklists: logistics, rain plans, fine print. Meta = the reassurance tag ("Filed", "9:00 AM", "×2"). |
| Schedule table | custom `variant: "schedule"` + item `meta` | Time-keyed rows: production calendars ("T-8 wks"), staffing charts ("×6 · Ch. 1"), permit sequences. |
| Spine timeline | runOfShow + item `phase` | The day itself. Phases break it into named acts ("Act II — The Table"). |
| Grouped index | scope `groups` (+ `blurb`) | The fee, organized by kind of work; numbering runs continuously across groups. |
| Exhibit | investment | Line items under a double-rule total; † ‡ ★ apparatus for terms. |

## Composition rules

- **One architecture per chapter.** A chapter is prose + one primary structure
  (+ optionally a frontispiece or quote). Two lists in one chapter = split it or cut one.
- **Adjacent chapters change texture.** Never let two register/table chapters sit
  back-to-back with the same variant; separate them with an image-led or exhibit
  chapter, or vary index vs schedule.
- **The meta column is a promise.** In index/schedule variants, `meta` is where the
  planning shows: a time, a count, a deadline, a status. If you can't fill it with
  something concrete, the item isn't planned enough yet — go find the fact.
- **Thorough ≠ verbose.** No-stone-unturned means every operational question a client
  could ask has a *row* somewhere (weather, permits, staffing, cars, insurance,
  neighbors, load-in) — each answered in one line, not a paragraph.
- **Images argue, they don't decorate.** A frontispiece earns its place by proving a
  point (the rain plan's glowing tent = "rain is handled, beautifully"). If the image
  only repeats the palette, it belongs in the palette chapter.
- **Phases name the experience,** not the schedule ("Family Hours", "The Floor" — never
  "Part 1"). Three or four acts; a phase with one item is not an act.
- **Spec strips carry honesty.** Venue `facts` use estimates marked as such
  ("Hire est.", "From $18,000") and live statuses ("Hold requested") — real planning
  states, not decoration.

## Per-style inflections

The same architecture wears each theme differently (handled by the renderer — but
write content that plays to it):

- **noir** — act titles as marquee lines; quotes short and declarative (Bebas sets
  them in caps); registers read like a maître d's book.
- **editorial** — metas as precise counts and channels ("×6 · Ch. 1"); quotes are
  theses; schedules read like a crew call sheet.
- **botanical** — quotes italic and warm; index items reassure ("Held to T-7",
  "Unmoved"); captions are figure plates.
- **festival** — schedules are city process and drum calls; phases are loud
  ("The Build", "Strike"); metas in weeks-out counts.
