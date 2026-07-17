# Builder Simulations — conversational walkthroughs that define the canvas UX

Eight simulated sessions between an operator (Kira / Kevin) and the quote builder.
Each one exists to force a design decision. The transcripts are written against the
**canvas-first** model: the rendered proposal fills the screen, a floating command bar
(`⌘K`) accepts prompts, and the model answers with a **stream of surgical operations**
(NDJSON, one op per line) that mold the document in place. Nothing ever flicker-replaces.

Conventions used below:

- `>` operator input in the command bar (with any active selection shown as a chip)
- `←` ops streamed back (abridged; long section bodies elided with `…`)
- `[canvas]` what the operator sees happen
- `※` design notes — the decisions each moment locks in

The op vocabulary referenced here is specified precisely in [canvas-spec.md](./canvas-spec.md):
`setMeta · setTheme · add · replace · remove · move · setImagery · ask · assume · note · done`.

---

## Simulation 1 — Cold start from a messy brief

**Context.** New quote. Empty canvas showing a ghost cover ("Untitled proposal — start
typing ⌘K"). Kira pastes a voice-note transcript from a discovery call.

```
> ok so this is for marcus he's turning 40 in may, wants something like a
  supper club thing, dark and sexy not a rager, maybe 60 people could be 80
  if his wife invites her side, somewhere downtown, he mentioned that place
  with the caviar cart?? budget he said "under six figures but make it count".
  live music for sure, he loves prince. date is probably the 16th
```

```
← {"op":"note","text":"Reading the brief — building a supper-club birthday for ~60–80 guests, downtown NYC, May 16."}
← {"op":"setMeta","patch":{"client":{"name":"Marcus"},"event":{"title":"Marcus at Forty","type":"birthday","date":"Saturday, May 16, 2026","guests":"60–80 Guests","location":"Downtown Manhattan, NYC"}}}
← {"op":"assume","id":"a1","field":"event.date","text":"Took “probably the 16th” as Saturday, May 16, 2026 — the Saturday works for an evening event."}
← {"op":"replace","id":"s_cover","section":{"type":"cover","eyebrow":"Event Proposal","facts":[…]}}
← {"op":"add","after":"s_cover","section":{"type":"vision","title":"The Supper Club","body":"Dinner first, party second …","facts":[{"label":"Event Type","value":"40th Birthday — Seated Supper"},{"label":"Dress Code","value":"After Dark — cocktail, no ties"},{"label":"Format","value":"Seated dinner → lounge takeover"}]}}
← {"op":"add","after":"s_vision","section":{"type":"palette","options":[{"name":"After Hours","badge":"Option 01 — Recommended","colors":[{"name":"Ink","hex":"#17151a"},…]}]}}
← {"op":"add","after":"s_palette","section":{"type":"venues","intro":"Availability pending for May 16 …","items":[{"name":"Casa Cipriani","area":"10 South St · Battery Maritime"},…]}}
← {"op":"assume","id":"a2","field":"sections.venues","text":"“The place with the caviar cart” read as Caviar Russe / Air's Champagne Parlor territory — shortlisted both plus three supper-club rooms."}
← {"op":"add","after":"s_venues","section":{"type":"moments","items":[{"title":"The Prince Set","description":"A three-piece takes the floor at 10:00 — Purple Rain on strings …"},…]}}
← {"op":"add","after":"s_moments","section":{"type":"runOfShow","items":[{"time":"7:30 PM","title":"Doors — martini cart"},…]}}
← {"op":"add","after":"s_runOfShow","section":{"type":"investment","options":[{"name":"Option A","total":{"min":68000,"max":82500},"items":[…]},{"name":"Option B","tagline":"The full supper club","total":{"min":94000,"max":112000},"items":[…]}]}}
← {"op":"assume","id":"a3","field":"sections.investment","text":"“Under six figures but make it count” anchored Option A at $68–82.5k with a $94–112k stretch — Option B crosses six figures at the top only where the live-band upgrade lands."}
← {"op":"add","after":"s_investment","section":{"type":"scope","items":[…]}}
← {"op":"add","after":"s_scope","section":{"type":"closing"}}
← {"op":"ask","id":"q1","text":"Is “his wife invites her side” likely? Locking 60 vs 80 changes the venue shortlist — two of the five rooms cap at 65 seated.","choices":["Plan for 60","Plan for 80","Keep the range"]}
← {"op":"done","summary":"Drafted 9 sections for Marcus at Forty — supper-club birthday, May 16, two investment options."}
```

**[canvas]** The cover materializes ~2s in, then sections stack beneath it one at a
time, each arriving with the same subtle rise the client-facing page uses. The viewport
gently follows the newest section. Three amber **assumption chips** accumulate in a tray
at the bottom edge of the command bar; the question lands last as a **question card**
docked to the bar with three tappable choices. The operator keeps scrolling while it's
open — nothing is modal.

`※` **Assume > ask.** The model made three assumptions and asked one question. The rule
this locks in: **proceed on any assumption that's cheap to reverse; ask only when a wrong
guess forks expensive work** (here: venue shortlisting by capacity). Never ask more than
one question per turn, and never block the stream on it — the `ask` op arrives *after*
the document is already useful.

`※` **Order of materialization is the loading state.** No spinners, no skeletons. The
document building itself top-to-bottom *is* the progress indicator. Ops apply the moment
their line arrives — the client never waits for the stream to finish.

`※` **Chips are the audit trail.** Every `assume` is tappable → prefills the bar with a
correction stub ("Actually, the date is …"). Dismissing a chip marks it accepted.
Chips persist on the doc (not the session) until resolved — they're also visible next
time the quote is opened.

---

## Simulation 2 — Surgical refinement via selection

**Context.** Same doc, next morning. Kira clicks the *Casa Cipriani* card inside the
venues section. It gets a selection ring; a chip reading **`venues › Casa Cipriani`**
appears in the command bar.

```
> [venues › Casa Cipriani]  swap this for somewhere in brooklyn with a rooftop,
  same energy
```

```
← {"op":"replace","id":"s_venues","section":{"type":"venues","items":[{"name":"The River Café Loft","area":"1 Water St · DUMBO","description":"Glass-wrapped …","tags":["Rooftop","Skyline","70 seated"]},{"name":"Casa Cipriani → removed"} …other four items verbatim…]}}
← {"op":"note","text":"Swapped Casa Cipriani for a DUMBO rooftop with the bridge behind the band. The other four venues are untouched."}
← {"op":"done","summary":"One venue swapped."}
```

**[canvas]** Only the one card cross-fades. The other four cards don't so much as
blink — the canvas **diffs the incoming section against the old one** and animates only
changed nodes.

`※` **`replace` is the finest-grained op — and that's fine.** We deliberately do *not*
have JSON-pointer field patches (`patch /sections/3/items/0/name`): models get paths
wrong, and validation becomes a minefield. Instead the model re-emits the whole section
(cheap — sections are small) and the **client-side differ** produces the surgical visual.
Op simplicity server-side, molding feel client-side.

`※` **Selection scopes write access.** With a selection active, the model may only emit
ops targeting the selected section (plus `note`/`assume`/`ask`/`done`) unless the
instruction *explicitly* names other sections ("…and update the budget accordingly").
This is enforced server-side: out-of-scope ops are dropped and logged. It's what makes
clicking-then-typing feel safe.

`※` **Verbatim preservation is a hard prompt rule.** The refine prompt instructs:
unchanged items must be byte-identical. The differ turns that into "nothing moves that
shouldn't."

---

## Simulation 3 — Full style pivot (theme ≠ content)

**Context.** Kira reviews the Marcus doc, which drafted in the default KJ cream/garnet.
Wrong mood for this client. No selection.

```
> this reads too bridal for marcus. make it feel like a private members club —
  dark, brass, low light, cigar lounge. keep all the content
```

```
← {"op":"setTheme","theme":{"style":"noir","tokens":{"bg":"#141114","bg2":"#1b171a","card":"#201a1d","tint":"#241d20","ink":"#ece5da","inkSoft":"#c7bcae","muted":"#8d8175","accent":"#b08d57","accentDeep":"#4a1620","highlight":"#2a2126","hairline":"#37302e","fontDisplay":"var(--font-bebas)","fontBody":"var(--font-jost)"}}}
← {"op":"note","text":"Rethemed to noir — near-black plum ground, brass accents, Bebas display. Content untouched."}
← {"op":"replace","id":"s_palette","section":{"type":"palette","options":[{"name":"After Hours","description":"Lacquer, smoke and brass …","colors":[{"name":"Plum Black","hex":"#141114"},{"name":"Brass","hex":"#b08d57"},{"name":"Oxblood","hex":"#4a1620"},{"name":"Smoke","hex":"#8d8175"},{"name":"Candlelight","hex":"#e8d5b0"}]}]}}
← {"op":"note","text":"Re-tuned the palette section so the swatches match the new direction — the only content edit, and it follows from the instruction."}
← {"op":"done","summary":"Noir theme applied; palette section re-tuned to match."}
```

**[canvas]** The whole document cross-fades to dark over ~600ms — CSS variables swap at
the root of the proposal frame, so every section retints simultaneously without
re-rendering. Type flips from Cormorant to Bebas display. The palette section's swatches
then update as their own surgical replace.

`※` **Theme is a token layer, not a rewrite.** `setTheme` touches zero content. This is
what makes "full brand flexibility" cheap: ~15 tokens + 2 font slots retint the entire
renderer via CSS custom properties. Themes can be a named preset (`noir`, `botanical`,
`editorial`, `festival`, `classic-kj` — defined in the style guides) or preset + token
overrides, or fully custom tokens.

`※` **Fonts are a whitelist.** The model picks from families already loaded by the site
(Cormorant Garamond, Jost, Bebas, DM Sans, Geist, Hello Paris). It emits the CSS var
name, never a font URL. No runtime font loading, no layout jank, no FOUT on the client
link.

`※` **A retheme may justify small content edits — but they're separate ops.** The
palette section is content that *describes* aesthetics, so it follows the theme. The
model narrates why with a `note`. Anything else (venues, prices) would be out of scope
for this instruction.

`※` **Dark themes are legit for print.** The client PDF prints full-bleed dark pages
(`print-color-adjust: exact` already set). That's a feature — the reference deck's
drama, different palette.

---

## Simulation 4 — Wedding services inquiry (the small quote)

**Context.** New quote, fresh canvas. A short-form inquiry — not every proposal is a
nine-section production.

```
> wedding inquiry from Grace Chen, ceremony already booked at Brooklyn Winery
  for Oct 3, she just needs day-of coordination, maybe partial planning.
  she asked about pricing in chinese with her mom on the call
```

```
← {"op":"setMeta","patch":{"client":{"name":"Grace Chen"},"event":{"title":"Grace & — · Brooklyn Winery","type":"wedding","date":"Saturday, October 3, 2026","location":"Brooklyn Winery, Williamsburg"}}}
← {"op":"replace","id":"s_cover","section":{"type":"cover","facts":[{"label":"Date","value":"Saturday, October 3, 2026"},{"label":"Location","value":"Brooklyn Winery"},{"label":"Status","value":"Venue booked"}]}}
← {"op":"add","after":"s_cover","section":{"type":"vision","title":"Already Halfway There","body":"The room is booked and the date is real — what Grace needs now is a steady hand …","facts":[{"label":"Engagement","value":"Coordination-forward"}]}}
← {"op":"add","after":"s_vision","section":{"type":"services","title":"Ways We Can Work Together","tiers":[
    {"name":"Wedding Day Management","nameAlt":"婚礼当日协调","price":"Begins at $800","includes":[…]},
    {"name":"Partial Planning","nameAlt":"部分策划服务","badge":"RECOMMENDED","price":"Custom quote","includes":[…]},
    {"name":"Full Planning","nameAlt":"全程婚礼策划","price":"Custom quote","includes":[…]}]}}
← {"op":"assume","id":"a1","field":"sections.services","text":"Badged Partial Planning as recommended — “maybe partial planning” plus a booked venue usually means she wants more than day-of."}
← {"op":"add","after":"s_services","section":{"type":"closing","body":"随时联系我们 — happy to continue in Chinese or English."}}
← {"op":"done","summary":"Four-section services proposal for Grace Chen — bilingual tiers, partial planning recommended."}
```

**[canvas]** Done in under 15 seconds — four sections, no palette, no venues, no
run-of-show, no investment table.

`※` **Document scale is a content decision, not a template.** The model chooses
sections; the canvas renders whatever arrives. There is no "minimum viable proposal"
enforced anywhere but the prompt (cover first, closing last).

`※` **Bilingual is a first-class content feature** — `nameAlt` on service tiers, and
free bilingual copy anywhere. The mention of the Chinese-language call flows into the
closing naturally. No special UI needed.

---

## Simulation 5 — Budget pushback with ripple recompute

**Context.** Marcus doc, a week later. Client called: hard cap. Kira selects the
investment section header.

```
> [investment]  marcus capped it at $60k firm. keep the live band, drop or
  shrink whatever else you have to. one option only.
```

```
← {"op":"note","text":"Rebuilding the quote to a single $60k-max option. Protecting the band; cutting the caviar service and pulling production down a tier."}
← {"op":"replace","id":"s_investment","section":{"type":"investment","intro":"One recommendation, engineered to the approved cap …","options":[{"name":"The Plan","total":{"min":52400,"max":59800},"items":[
    {"name":"Venue + F&B","price":{"min":24000,"max":27000}},
    {"name":"Beverage Program","price":{"min":6500,"max":7500},"note":"Martini cart stays; caviar service cut"},
    {"name":"Entertainment — Live Trio","price":{"min":7500,"max":8500},"badge":"INCLUDED","note":"★ Protected per Marcus"},
    {"name":"Production (Lights & AV)","price":{"min":4200,"max":5200}},
    {"name":"Décor & Florals","price":{"min":3200,"max":4200}},
    {"name":"Photography","price":{"min":2800,"max":3400},"note":"Photo only — videography dropped"},
    {"name":"Service Charges + Admin + Tax","price":{"min":3200,"max":3800}},
    {"name":"Planning Fee","price":{"min":5000},"note":"★ You will be charged $5,000"}]}],
    "disclaimer":"We commit to keeping the final spend within the approved $60,000."}}
← {"op":"note","text":"Total checks out: mins sum to $52,400, maxes to $59,800 — $200 of headroom under the cap at the top of every range."}
← {"op":"ask","id":"q1","text":"Videography was the biggest painless cut ($4–5k). If Marcus would rather lose the florals tier instead, say the word and I'll re-cut."}
← {"op":"done","summary":"Single $52.4–59.8k option, band protected, cap respected."}
```

**[canvas]** The two-option spread collapses to one maroon band. A subtle **verified
total** tick appears beside the option total — the client recomputed the sum of line
items and it matched. (When it *doesn't* match, the total gets an amber "check math"
badge and the discrepancy is one click from a fix-it prompt.)

`※` **Money math is model-computed, client-verified.** The model must emit exact
totals (they display verbatim); the canvas independently sums line items and badges
mismatches. Never silently "fix" the model's numbers — surface, don't mask.

`※` **Trade-off narration lives in `note` ops**, which also become the history-drawer
entry for this turn. The proposal itself stays client-clean; the *reasoning* stays in
the tool.

`※` **An `ask` can be rhetorical/optional** — an offer, not a blocker. It renders as a
question card with a dismiss affordance, same as chips.

---

## Simulation 6 — Imagery direction loop (Higgsfield)

**Context.** Noir-themed Marcus doc. Kira clicks the empty hero slot in the palette
section — image slots render as art-directed placeholders (a tinted panel with the
style's mark) until filled. Selection chip: **`palette › After Hours › hero`**.

```
> [palette › After Hours › hero]  moody nighttime supper club interior,
  candlelight, brass details, empty room right before guests arrive
```

```
← {"op":"note","text":"Directing the hero through the noir style guide — Soul, 21:9, low-key tungsten, no people, no text."}
← {"op":"setImagery","id":"s_palette","slot":"options[0].hero","request":{
    "styleRef":"noir",
    "model":"soul",
    "aspect":"21:9",
    "prompt":"Empty private supper club interior moments before service, deep plum-black walls with brass rail details, banquette seating in oxblood leather, dozens of lit taper candles, single warm tungsten pool over a small stage with an upright bass resting, cinematic low-key photograph, film grain","negatives":["text","letters","signage","people","faces","watermark","logo"],
    "alt":"Candlelit supper club interior in plum black and brass, empty stage with upright bass"}}
← {"op":"done","summary":"Hero queued for generation."}
```

**[canvas]** The slot shifts into a slow brass shimmer. The op stream is already
closed — generation is **asynchronous**. ~40s later the image fades in, and a system
entry (not a model op) appears in the history drawer: *"Hero generated · Soul · 21:9 ·
persisted to library · 8 credits (592 left)."* Kira clicks the slot again:

```
> [palette › After Hours › hero]  darker. barely-lit. and lose the bass, too on the nose
```

The request re-issues with the prompt amended; the old image stays until the new one
lands (never an empty slot), then swaps. The previous generation is kept in the slot's
**take history** — hover the slot → filmstrip of prior takes, click to restore.

`※` **The model art-directs; the app generates.** `setImagery` carries a *request*
(style-guide-compliant prompt, model, aspect, negatives, alt text) — not an image. The
app owns the Higgsfield call, polling, **persistence** (URLs expire in ~1h → download to
`public/library/` in dev, Vercel Blob in prod), and credit accounting. Ops stay fast and
the stream never waits on a render.

`※` **The no-baked-text rule is enforced twice**: in every prompt template's negatives,
and at the schema level (`hasBakedText` exists only to grandfather legacy reference
assets). Typography is always an HTML overlay.

`※` **Takes are cheap, so keep them.** Regeneration is the primary loop; a filmstrip of
takes per slot beats "are you sure?" dialogs. Credits are surfaced per generation and in
the drawer, never as a nag.

---

## Simulation 7 — Mid-flight contradiction and ripple

**Context.** Marcus doc again. New information that invalidates earlier structure. No
selection — this is a document-wide instruction.

```
> update: it's actually 150 people now, his wife won the argument. same budget cap.
```

```
← {"op":"setMeta","patch":{"event":{"guests":"~150 Guests"}}}
← {"op":"note","text":"150 guests changes more than a number — three of the five venues cap below 100 seated, and $60k over 150 heads is $400/head, which moves us from supper club to cocktail-forward."}
← {"op":"replace","id":"s_venues","section":{"type":"venues","intro":"Re-shortlisted for 150 …","items":[…5 larger rooms…]}}
← {"op":"replace","id":"s_vision","section":{"type":"vision","title":"The Supper Club, Standing","body":"The mood survives the headcount: dinner becomes a heavy passed-and-stations format …","facts":[…"Format: Cocktail-forward with seated moments"…]}}
← {"op":"replace","id":"s_investment","section":{"type":"investment","options":[{"name":"The Plan","total":{"min":54200,"max":59900},"items":[…re-cut per-head…]}]}}
← {"op":"note","text":"Held the $60k cap by trading the seated dinner for stations + passed. Band, palette and run-of-show survive as-is."}
← {"op":"ask","id":"q1","text":"At 150 the run-of-show's 8:00 seated toast doesn't work as written — want me to restage it as a standing toast, or carve a seated VIP room for 40?","choices":["Standing toast","Seated VIP room"]}
← {"op":"done","summary":"Rippled 150 guests through venues, vision, and investment; one staging question open."}
```

**[canvas]** Three sections update in sequence, each with the surgical diff animation;
untouched sections (palette, moments, scope, closing) never move. The question card
waits in the bar.

`※` **Ripple is explicit, not magic.** The model narrates *why* the change cascades
(`note`) before touching each section — the operator watches causality, not churn. A
document-wide instruction (no selection) grants document-wide write scope, and the model
still leaves a question where two staging philosophies genuinely diverge.

`※` **This turn's history entry is the ripple story.** The drawer shows: instruction →
notes → 4 sections touched → 1 open question. One `Ctrl+Z` restores the *entire turn's*
before-state (turn-level snapshots), not one op at a time.

---

## Simulation 8 — Proof, publish, and the app/model boundary

**Context.** Marcus doc, final pass. This simulation is about what is *not* a model op.

```
> tighten all the copy — anything that reads generic gets one more specific detail.
  then it's ready to send
```

```
← {"op":"replace","id":"s_vision","section":{…"Columbia-blue gin martini on arrival" instead of "welcome cocktails"…}}
← {"op":"replace","id":"s_moments","section":{…two of six items sharpened, four verbatim…}}
← {"op":"note","text":"Tightened vision and two moments. Everything else was already specific — didn't touch it to say I did."}
← {"op":"done","summary":"Copy pass complete."}
```

**[canvas]** Two sections shimmer briefly. Then Kira types `/` — the bar switches from
prompt mode to **command mode** with typeahead: `/share`, `/pdf`, `/theme`, `/preview`,
`/history`, `/status`. She picks `/share`.

The **share sheet** (an app surface, no model involved): status flips draft → sent,
confidential toggle (on), the public link `kirajiaevents.com/p/marcus-at-forty-x7k2`
with copy button, and "Open print view" for the PDF. A last-look checklist renders
automatically: *2 unresolved assumption chips · 1 open question · all images persisted ·
totals verified.* The chips must be resolved or explicitly dismissed before the link
copies — the one gate in the whole flow.

`※` **Ops mutate the document; slash commands drive the app.** Publishing, exporting,
theming-by-preset-picker, history — deterministic app actions, zero model latency, never
routed through the LLM. The `/` prefix is the seam, and it keeps the ⌘K bar as the
single home for *everything* without pretending the model does everything.

`※` **The pre-share checklist is where chips pay off.** Assumptions were free during
drafting *because* they get audited exactly once, here, when wrongness would actually
cost something.

`※` **Restraint is a quality bar.** "Didn't touch it to say I did" — the refine prompt
rewards minimal diffs; the differ makes over-editing visible (everything would shimmer).

---

## Simulation 9 — Linked venue, real photos, and the dress-up pass

**Context.** Marcus doc, venues chapter. The Django is the front-runner and generated
"atmosphere direction" is no longer good enough — Kira wants the actual room in the
document. She clicks the venue row. Selection chip: **`venues › The Django`**.

```
> /link-venue
```

**[canvas]** An app surface (no model round-trip): a Places search pre-filled with
"The Django · 2 6th Ave"; one click links the listing (`placeId` lands on the venue
item) and a **photo tray** opens — the listing's interiors, each with its author
credit. Kira picks the amber bar shot. The app imports it
(`POST /api/admin/places/import` → persisted copy, never a hotlink) and the venue row's
figure swaps to the real room, captioned with the photographer credit. The generated
take drops into the slot's take history. A drawer entry logs: *"The Django linked ·
1 photo imported · source: Google listing."*

```
> [venues › The Django]  bring the photo to our look, then dress the room for the
  supper club — one long table down the middle, tapers, dark florals
```

```
← {"op":"note","text":"Two passes over the real photo: a regrade to the noir palette, then the supper-club dressing. Both are concept renders over the actual room — captioned as such, with the untouched photo kept in takes."}
← {"op":"setImagery","id":"s_venues","slot":"items[1].image","request":{
    "styleRef":"noir","model":"seedream_v4_5","aspect":"3:2",
    "prompt":"Regrade to deep plum-black and brass, candlelight temperature, keep architecture and furnishings exactly as photographed",
    "negatives":["text","letters","signage","watermark","logo","white background","bright background"],
    "reference":{"url":"/uploads/places/the-django/8a91c04f22.jpg","kind":"venue-photo"},
    "alt":"Concept render over the actual room at The Django — regraded to the After Hours palette"}}
← {"op":"setImagery","id":"s_venues","slot":"items[1].image","request":{
    "styleRef":"noir","model":"seedream_v4_5","aspect":"3:2",
    "prompt":"Dress the room for a seated supper: one long banquet table down the center, taper candles in brass holders, low dark burgundy florals, place settings catching candlelight, architecture unchanged",
    "negatives":["text","letters","signage","watermark","logo","white background","bright background"],
    "reference":{"url":"/uploads/places/the-django/8a91c04f22.jpg","kind":"venue-photo"},
    "alt":"Concept render over the actual room at The Django — dressed for the supper club"}}
← {"op":"done","summary":"Two takes queued over the real room: the regrade and the dressed supper club."}
```

**[canvas]** The slot shimmers through two sequential generations; the filmstrip now
holds *listing photo → regrade → dressed render*, restorable in one click. The visible
caption reads the honesty line, not the venue's name alone.

`※` **Reality first, generation second.** A linked listing or an upload beats generated
atmosphere for venue slots, every time. Linking and importing are app actions;
prompting takes over only once a real photo grounds the slot.

`※` **The standardize → dress workflow is the product's venue story**: the client sees
*their* room, first as it photographs, then graded to the brand standard, then wearing
the event. Each step is a take, each render is captioned as a concept render — the
venue-honesty rule extends to dressed reality, it doesn't retire.

`※` **Attribution is not optional.** Google photos carry their author credit into the
document as a caption suffix; stripping it is a bug, not a style choice.

---

## The rules the simulations lock in

1. **The document is the interface.** Full-bleed render identical to the client page;
   every change lands as a visible, local, animated diff. No form. No flicker.
2. **Ops are section-grained; the differ makes them feel field-grained.** `replace` is
   the workhorse; no JSON-pointer patching.
3. **Assume and proceed; ask at most once per turn, never blocking, only when a wrong
   guess forks expensive work.** Chips audit assumptions; the share gate settles them.
4. **Selection scopes write access** — enforced server-side, not just prompted.
5. **Theme is tokens, content is sections; `setTheme` never rewrites copy.** Presets
   come from the style guides; fonts from the loaded whitelist.
6. **Totals display verbatim from the model but are verified client-side.** Mismatch =
   visible badge, never silent correction.
7. **Imagery: model art-directs (`setImagery` request), app generates asynchronously,
   persists immediately (1h URL expiry), keeps takes, surfaces credits.** No baked text,
   ever.
8. **`note` ops narrate reasoning into the history drawer; the proposal stays
   client-clean.** Turn-level undo, not op-level.
9. **Slash commands (`/share`, `/pdf`, `/theme` …) are app actions — deterministic, no
   model round-trip.** The ⌘K bar hosts both modes.
10. **Scale is a content decision** — four sections is a complete proposal when the
    engagement is small.
11. **Reality first, generation second for venues.** Linked listings and uploads ground
    venue slots; standardize → dress renders over the real room are captioned as
    concept renders, keep the source in takes, and never strip the photo credit.
