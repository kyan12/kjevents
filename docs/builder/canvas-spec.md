# Canvas Builder Spec — architecture for the prompt-molded proposal canvas

Derived from [simulations.md](./simulations.md). This is the build contract for task
"Canvas-first builder rebuild" — read the simulations first; every rule here traces to
one of them.

## 1. Principles

1. The rendered proposal **is** the editor. One renderer (`ProposalView`) serves the
   client page, the canvas, and print — the canvas adds an interaction layer on top,
   never a parallel implementation.
2. Changes arrive as **surgical ops** and land as local animated diffs. The document is
   never wholesale re-rendered in response to a prompt.
3. **Assume > ask** (≤1 `ask`/turn, non-blocking). **Selection scopes writes.**
   **Theme ≠ content.** **Model math, client verification.** **App actions ≠ model ops.**

## 2. Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│  canvas viewport (scrollable, full-bleed proposal render)    │
│                                                              │
│   ┌────────────────────────────────────────────┐             │
│   │  ProposalView (theme CSS vars scoped here) │  ← selection│
│   │  sections with hover affordances,          │    rings,   │
│   │  image slots, inline text editing          │    diffs    │
│   └────────────────────────────────────────────┘             │
│                                                              │
│         ┌───────────────────────────────────┐                │
│         │ assumption chips · question card  │  ← tray        │
│         ├───────────────────────────────────┤                │
│         │ ⌘K  command bar (prompt | /cmd)   │  ← floating    │
│         └───────────────────────────────────┘                │
│  [history drawer ⟵ right edge]   [inspector ⟵ on selection]  │
└──────────────────────────────────────────────────────────────┘
```

- **Command bar** — floating, bottom-center, summoned/focused with `⌘K`/`Ctrl+K`.
  Modes: *prompt* (default) and *command* (`/` prefix, typeahead). Shows the active
  selection as a removable chip. States: `idle → streaming (stop button) → idle`.
- **Chips tray** — above the bar. Amber chips (`assume`), question cards (`ask` — with
  choice buttons when provided). Click chip → prefills correction; ✕ → accept/dismiss.
  Persisted on the document until resolved.
- **History drawer** — right edge, collapsible. One entry per turn: instruction,
  `note` texts, touched-section list, `done` summary, plus system entries (imagery
  jobs, publishes). Each entry has "Restore to before this turn."
- **Inspector** — narrow right panel that appears only for a selection, only with
  precision fields for that node type (prices as numbers, date pickers, hex inputs,
  badge selects). It writes the same store the ops write. No section adding/reordering
  here — that's canvas drag + ops territory.
- **Canvas direct manipulation** — inline `contentEditable` for text nodes (commits as
  a local `replace`), drag handles on section headers for reorder (commits `move`),
  hover ✕ to hide/remove, image slots per Simulation 6.

## 3. Selection model

```ts
type Selection =
  | { kind: "section"; sectionId: string }
  | { kind: "item"; sectionId: string; path: string }      // e.g. "items[2]", "options[0].items[4]"
  | { kind: "imageSlot"; sectionId: string; slot: string } // e.g. "options[0].hero"
  | null;
```

- Click a section's margin/header → section selection; click a card/row/slot → item
  selection. `Esc` clears. Selection renders as a ring + the bar chip.
- The selection is serialized into the model request (§6) and **enforces write scope**:
  while a selection is active, mutating ops (`replace`, `remove`, `move`, `setImagery`)
  targeting other sections are dropped server-side (logged as `scope_violation`) unless
  the instruction names them — detection is the model's job via an explicit
  `scope: "document"` escape it must emit on its first op when it decides the
  instruction requires cross-section work (e.g. "…and update the budget").
  `setMeta`/`setTheme`/`ask`/`assume`/`note`/`done` are always in scope.

## 4. Operation protocol

### 4.1 Vocabulary

```ts
type Op =
  | { op: "setMeta";  patch: DeepPartial<Pick<Proposal, "client" | "event" | "confidential">> }
  | { op: "setTheme"; theme: { style: StyleName | "custom"; tokens?: Partial<ThemeTokens> } }
  | { op: "add";      after?: string; before?: string; section: SectionDraft } // anchor = section id; omit → append before closing
  | { op: "replace";  id: string; section: SectionDraft }
  | { op: "remove";   id: string }
  | { op: "move";     id: string; after?: string; before?: string }
  | { op: "setImagery"; id: string; slot: string; request: ImageryRequest }
  | { op: "ask";      id: string; text: string; choices?: string[] }
  | { op: "assume";   id: string; field: string; text: string }
  | { op: "note";     text: string }
  | { op: "done";     summary: string; scope?: "document" };

interface ImageryRequest {
  styleRef: StyleName;        // which style guide governs
  model: string;              // e.g. "soul" — from the art-direction operational guide
  aspect: string;             // "21:9" | "4:5" | "3:2" | "1:1" per slot conventions
  prompt: string;             // full art-directed prompt
  negatives: string[];        // always includes text/letters/watermark/people-when-appropriate
  alt: string;                // accessibility + admin labeling; venue slots must carry
                              // the honesty language — alt renders as the visible caption
  reference?: {               // image-to-image: ground the generation in a real photo
    url: string;              // an asset already in the doc/library (imported venue photo)
    kind: "venue-photo" | "style";
  };
}
```

Structural image slots (shipped in schema + renderer v2 — `slot` strings for `setImagery`):

| `slot` | Section | Aspect | Renderer treatment |
|---|---|---|---|
| `background` | cover | 21:9 | full-bleed behind scrim; type flips to fixed light palette |
| `image` | vision | 21:9 | full-width spread figure + caption from `alt` |
| `options[i].hero` | palette | 21:9 | framed hero, type overlay bottom-left |
| `options[i].gallery[j]` | palette | 4:5 | mood tiles |
| `items[i].image` | venues | 3:2 | right column of numbered row + honesty caption |
| `items[i].image` | moments | 3:2 | image-led vignette |
| `items[i].image` | custom (vignettes) | 3:2 | image-led vignette |
| `image` | custom | 21:9 | chapter frontispiece between opener and items, caption from `alt` |
| `texture` | closing | 21:9 | near-abstract texture behind heavy bg-tint scrim |

Hard rules the op author must obey (full text in the art-direction skill):
**dark-theme rule** (dark ground → dark-field imagery only, extra negatives) and
**venue-honesty rule** (atmospheric direction, never claimed as the actual venue).

`SectionDraft` = the schema's section types minus `id` (server/client mints ids;
model-supplied ids are ignored on `add`, required-and-matched on `replace`).

**Chapter composition.** Sections are chapters, not lists — the op author varies the
component mix per chapter using the schema's composition fields: `quote` (pull quote,
vision/custom), `facts` on venue items (spec strip), `phase` on run-of-show items (act
headers), `groups` on scope (service index), and `variant` on custom
(`vignettes | index | schedule`) with per-item `meta`. Full architecture guide:
`.claude/skills/art-direction/references/chapter-composition.md`.

### 4.2 Wire format — NDJSON

- `POST /api/ai/ops` responds `Content-Type: application/x-ndjson`, one JSON op per
  line, flushed as generated.
- Client applies each line **the moment it parses**. A malformed line is skipped and
  logged; the stream continues (ops are independent by design).
- Stream ends with `done` (or an error line `{"op":"error","message":…}` → toast +
  turn rollback offer).
- The Anthropic call behind it uses fine-grained streaming of a single tool /
  line-delimited text output; server validates each op against a zod `OpSchema` union
  before forwarding — invalid ops are dropped server-side, never sent to the client.

### 4.3 Client apply rules

- Apply ops to a **draft copy**; the turn commits to the store on `done` (autosave
  debounced ~800ms after). `Stop` button mid-stream → keep-or-rollback choice.
- **Turn snapshot** taken before the first op; history drawer restore + `Ctrl+Z` are
  snapshot swaps. Redo = `Ctrl+Shift+Z`. Snapshots live with the doc (last ~50 turns).
- **Section differ**: on `replace`, diff old vs new section JSON; nodes whose
  stringified value changed get a `data-changed` flag for ~1.2s → CSS cross-fade/shimmer.
  Unchanged nodes must not re-mount (stable keys from item index + name).
- **Totals verification**: after any `replace` of an investment section, client sums
  line-item mins/maxes per option and compares to `total`. Mismatch → amber "check
  math" badge on the total; click → prefills "Recompute the totals for {option}".
- `add` without anchor inserts before the closing section if present, else appends.
  Dangling anchors (id not found) → append + console warn, never a hard failure.

## 5. Theme system

```ts
type StyleName = "classic-kj" | "noir" | "botanical" | "editorial" | "festival";

interface ThemeTokens {
  bg: string; bg2: string; card: string; tint: string;       // grounds
  ink: string; inkSoft: string; muted: string;               // foregrounds
  accent: string; accentDeep: string; highlight: string;     // brand
  hairline: string; hairlineSoft: string;                    // rules
  fontDisplay: string; fontBody: string;                     // CSS var names from the whitelist
}
```

- `Proposal` schema gains an **optional** `theme` field (`{style, tokens?}`); absent →
  `classic-kj` (current hard-coded values become that preset). Fully backward
  compatible with existing seeds/store.
- `ProposalView` resolves preset + overrides → inline CSS custom properties on its root
  (`--p-bg`, `--p-ink`, `--p-accent`, …); `proposal.module.css` swaps its literals for
  `var(--p-*, <current literal>)`. Client page, canvas, and print all inherit
  automatically.
- **Font whitelist** (already loaded in the root layout — never load fonts at runtime):
  `--font-cormorant`, `--font-jost`, `--font-bebas`, `--font-dm`, plus Geist and Hello
  Paris (accent/script use). The model emits var names; anything else is rejected in
  validation.
- Preset token values are canonically defined in the style guides
  (`.claude/skills/art-direction/references/style-*.md`) and mirrored in
  `lib/proposal/themes.ts` (single source: the TS file; guides quote it).

## 6. Model API — `POST /api/ai/ops`

Request:

```ts
{
  instruction: string;
  proposal: TProposal;            // current full doc (small — tens of KB)
  selection?: Selection;          // §3
  turn: number;                   // for logging/idempotency
}
```

- **System prompt** = current `SYSTEM_PROMPT` voice/pricing/convention core, plus the
  op protocol contract, scope rules, assume-vs-ask policy, imagery request rules
  (style-guide digests for prompt templates), and the theme preset list. Static →
  prompt-cached (`cache_control: ephemeral`), same as today.
- Model: `claude-opus-4-8`, adaptive thinking, streaming; `maxDuration = 300`.
- Cold start (empty scaffold) and refine are the same endpoint — the empty doc *is*
  the context, matching Simulation 1.
- The existing `/api/ai/parse` (full-doc JSON) stays during transition as the Import
  JSON / batch path; the canvas talks ops only.

## 7. Imagery pipeline (app-owned, per Simulation 6)

1. `setImagery` op → client POSTs `/api/imagery/generate` `{proposalId, sectionId,
   slot, request}` → returns `jobId`; slot enters `generating` (shimmer, old image
   retained beneath).
2. Server calls Higgsfield (dev: MCP-generated library assets already on disk; prod:
   Cloud API submit-then-poll with `HIGGSFIELD_API_KEY/SECRET`).
3. On completion the server **immediately persists** (dev: `public/library/…`; prod:
   Vercel Blob) — Higgsfield URLs die in ~1h; the expiring URL never enters the doc.
4. Server patches the slot's `ImageAsset {url, alt, source: "generated", prompt}` and
   appends the previous asset to the slot's take history (`takes: ImageAsset[]`, new
   optional schema field). Client polls `/api/imagery/jobs/:id` (or SSE later).
5. History drawer gets a system entry with model/aspect/credits; take filmstrip on
   slot hover restores prior takes locally.
6. Failure → slot badge + retry affordance; old image stays.

## 7b. Real-venue photos — linked listings, uploads, and the dress-up workflow

Venue and restaurant interiors should come from **reality first, generation second**.
Three sources, in order of preference:

1. **Linked Google listing** — a venue row links to its Google Business Profile /
   Places entry (`VenueItem.placeId`). Shipped API (admin-gated):
   - `GET  /api/admin/places/search?q=…` → candidates with photo refs + author credits
   - `POST /api/admin/places/import {photoName, venue, attribution}` → downloads the
     photo and persists it (dev: `public/uploads/places/…`; prod: Vercel Blob), returns
     an `ImageAsset {url, alt, source: "google", attribution}`. The hotlinked Google URL
     never enters a document; `attribution` renders as a "Photo: …" caption credit.
2. **Manual upload** — `POST /api/admin/upload` (multipart) for the client's own shots
   and scouting photos → `ImageAsset {source: "upload"}`.
3. **Generated atmosphere** — only when no real photo serves; venue-honesty rule applies.

**Canvas affordances (build step 6):** on a venue selection, `/link-venue` (or the row's
link affordance) runs search → pick listing → photo tray; clicking a tray photo imports
it into `items[i].image`. Linking and importing are **app actions** — no model round-trip.

**Standardize → dress (the workflow example):** once a real photo is in the slot,
prompting takes over, grounded in that photo via `ImageryRequest.reference`:

1. *Standardize* — "bring these to our look": image-to-image pass that regrades the real
   photo to the document's palette/light (brand-standard treatment, geometry untouched).
2. *Dress* — "dress the room for the supper club: one long table, tapers, dark florals":
   image-to-image over the real room applying the event's installations.

Dressed outputs are **concept renders, not photographs** — the alt/caption must say so:
`"Concept render over the actual room at The Django — dressed for the supper club"`.
The untouched source photo stays in the slot's take history. Full rules:
`.claude/skills/art-direction/references/imagery-rules.md` → Real-venue pipeline.

## 8. Slash commands (app actions — no model round-trip)

`/share` (checklist gate: unresolved chips/questions must be accepted or dismissed →
status flip + copy link), `/pdf` (opens `/p/[slug]?static=1` print view), `/theme`
(preset picker — issues a local `setTheme`), `/preview` (client-eye view: selection
affordances off), `/history` (toggle drawer), `/status` (draft/sent/archived),
`/link-venue` (on a venue selection: Places search → link listing → photo tray, §7b),
`/upload` (manual image intake into the selected slot, §7b),
`/import` · `/export` (JSON doors, kept from v1).

## 9. Keyboard map

`⌘K` focus bar · `Esc` clear selection/close bar · `⌘Z`/`⌘⇧Z` undo/redo turn ·
`⌘S` force save · `↑` in empty bar = recall last instruction · `/` command mode ·
`Enter` on question-card choice buttons.

## 10. Build plan (task #11, after artifact review)

1. **Theme layer** — `themes.ts` presets, schema `theme` field, CSS-var swap in
   renderer + module CSS. (Also unblocks styled sample seeds independently of canvas.)
   ✅ shipped
2. **Ops core** — `lib/proposal/ops.ts` (zod OpSchema + `applyOp` reducer + differ),
   unit-testable pure functions. ✅ shipped (+ `scripts/ops-smoke.ts`)
3. **`/api/ai/ops`** — NDJSON streaming route + system prompt extension + scope
   enforcement. ✅ shipped (`lib/ai/ops-prompt.ts`; 503 until ANTHROPIC_API_KEY set)
4. **Canvas shell** — route `admin/quotes/[id]/canvas` (v1 editor stays until parity),
   viewport + selection + bar + chips + drawer + turn snapshots. ✅ shipped
   (`components/canvas/`; selection/edit anchors are `data-sec`/`data-item`/`data-slot`/
   `data-edit` attributes in ProposalView — inert on the client page)
5. **Direct manipulation** — inline text edit, drag reorder, inspector. ✅ shipped
   (dbl-click contentEditable → local `replace`; reorder via the section rail; inspector
   for meta / prices / image slots / closing contact)
6. **Imagery pipeline** — generate route, job store, slot states, takes. ◐ partial:
   real-photo paths live (venue tray → Places import, /upload); `setImagery` requests
   are logged to the history drawer — the Higgsfield Cloud API generate/jobs routes and
   take filmstrips land with the deploy task (needs HIGGSFIELD_API_KEY/SECRET wiring).
7. **Share flow** — checklist gate + publish sheet ✅ shipped; v1 editor retained
   deliberately until canvas parity is confirmed in real use.
