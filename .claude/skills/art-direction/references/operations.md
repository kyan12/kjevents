# Operations — models, credits, generation flows

## Model selection (verified against the live catalog, 2026-07-16)

| Model (`model_id`) | Use for | Aspects | Quality knobs | Watch out |
|---|---|---|---|---|
| **Seedream 4.5** (`seedream_v4_5`) | Interiors, tablescapes, architecture, textures, florals — anything wide or precise. **Default for heroes.** | incl. **21:9**, 3:2, 4:3, 1:1, 4:5-ish via 3:4 | `quality: basic` (≤4K) / `high` (≤6K) | Use `basic` — proposal slots never need 6K. |
| **Soul 2.0** (`soul_2`) | Editorial shots where human presence carries the frame (fashion-adjacent atmosphere, hands, silhouettes). | max 16:9 / 3:2 — **no 21:9** | `quality: 1.5k` / `2k` | For a wide hero with people: generate 16:9 then `outpaint_image` to 21:9, or crop. |
| **GPT Image 2** (`gpt_image_2`) | Fallback / stylized illustration textures. | up to 3:2 | `resolution`, `quality` | Its typography strength is irrelevant — we never bake text. |

When unsure, call `models_explore(action:"recommend")` with the shot description
before generating — the catalog evolves.

Dedicated edit tools beat re-generation: `upscale_image` (res bump), `outpaint_image`
(extend/uncrop — e.g. Soul 16:9 → 21:9), `remove_background` (cutout motifs).

## Credit discipline

- Balance at project start: **600 credits (Pro)**. Check `balance` before any batch;
  record per-image cost in the manifest (visible in `transactions`).
- **Calibrate first**: generate ONE image, check the credit delta, then extrapolate
  before committing to a batch. Stop and report to the operator before any batch that
  would spend >100 credits or take the balance below 200.
- Take budget: ~2–3 takes per slot. If take 3 misses, the prompt is wrong — rewrite
  from the style guide instead of rerolling.
- Library-first: before generating, check the style's `manifest.json` for an existing
  asset that fits the slot.

## Dev flow (Higgsfield MCP, in-session)

1. `generate_image` with `model_id`, prompt, negatives, `aspect_ratio`, quality —
   batch related shots in one call where supported.
2. Poll `job_status` until complete; get URLs via `job_display` / `reveal_generation`.
3. **Download immediately** (≤1h expiry) to `public/library/<style>/` with the
   canonical filename; append the manifest entry (see imagery-rules.md).
4. Wire into seeds/docs by local path only.

## Prod flow (Cloud API — runtime `setImagery`, task #11 phase 6)

1. `/api/imagery/generate` receives the `ImageryRequest` from a `setImagery` op.
2. Server calls cloud.higgsfield.ai (official JS SDK, `HIGGSFIELD_API_KEY/SECRET`),
   submit-then-poll.
3. On completion: stream the bytes straight to Vercel Blob (`library/<style>/…`),
   then patch the proposal slot with the **Blob** URL + alt + prompt. The Higgsfield
   URL must never be stored.
4. Append credits + model to the job record for the history drawer.
