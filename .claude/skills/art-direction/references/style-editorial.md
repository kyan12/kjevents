# Style — `editorial`

**Essence.** Swiss-modern corporate gala: gallery-white space, near-black ink, one
vermillion accent doing all the work. Grids, precision, restraint. For corporate
events, product launches, galas, award dinners where the client's brand is the star.

## Theme tokens

| Token | Hex | Name |
|---|---|---|
| bg | `#f6f6f2` | Gallery white |
| bg2 | `#eeeee8` | Warm gray-white |
| card | `#ffffff` | Pure white |
| tint | `#f0f0ea` | Fog |
| ink | `#111111` | Near black |
| inkSoft | `#3c3c38` | Charcoal |
| muted | `#7a7a72` | Concrete |
| accent | `#de3919` | Vermillion |
| accentDeep | `#1c1c1c` | Ink block |
| highlight | `#e8e8e0` | Paper |
| hairline | `#d6d6cc` / soft `#e4e4da` | Hairline gray |

**Type.** Display `var(--font-sans)` (Geist — tight, large, all-caps eyebrows) · Body
`var(--font-dm)` (DM Sans). No serifs, no scripts, anywhere. Scale contrast does the
expressive work: massive numerals, tiny labels.

## Mood lexicon

gallery light · poured concrete · black-tie minimal · single accent · architectural ·
raking light · monolithic · negative space · precision tablescape · museum after hours

**Anti-lexicon:** cozy, warm, romantic, floral abundance, candlelit (sparingly OK),
ballroom, drapery.

## Light & materials

Directional gallery light — raking daylight from full-height glass, or crisp spots in
dark halls. Concrete, blackened steel, white oak, glass, matte paper. Color discipline
is absolute: monochrome frame + at most one vermillion object.

## Prompt templates

**Hero (21:9, `seedream_v4_5`):**
> Architectural editorial photograph of {environment — e.g. "a monolithic concrete
> hall set for a gala dinner, long black tables in a precise grid"}, raking natural
> light through full-height glass, monochrome palette of white, concrete gray and near
> black with a single vermillion floral installation as the only color, vast negative
> space, precise one-point perspective
> — negatives: canon + `people, faces, warm amber light, clutter, drapery, multiple accent colors`

**Gallery tile (4:5, `seedream_v4_5`; `soul_2` for fashion-adjacent figures):**
> Minimal editorial still life of {subject — "a single vermillion anthurium in a black
> vase on concrete" / "matte black place setting on white oak"}, directional gallery
> light, hard shadow, monochrome plus one accent

**Texture (21:9):**
> Near-abstract of {material — "raking light across board-formed concrete" / "matte
> black paper with one vermillion torn edge"}, hard directional light

## Shot list (library)

1. Hero — concrete hall gala grid, vermillion installation (21:9)
2. Hero — museum atrium cocktail set, dusk through glass, empty (21:9)
3. Tile — vermillion anthurium, black vase (4:5)
4. Tile — matte black place setting (4:5)
5. Tile — blackened-steel bar, backlit bottles as silhouettes (4:5)
6. Tile — figure in black tailoring, motion blur, distant (4:5, `soul_2`)
7. Texture — raking light on concrete (21:9)
