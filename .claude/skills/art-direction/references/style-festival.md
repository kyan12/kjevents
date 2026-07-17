# Style — `festival`

**Essence.** Cultural production energy: cinnabar red and gold on warm paper, lantern
light, layered pattern and craft. Rooted in Chinese festival vocabulary (the studio's
heritage) but adaptable to any cultural production — Diwali, Lunar New Year, heritage
galas, street-festival activations. Joyful and saturated, never theme-party kitsch.

## Theme tokens

| Token | Hex | Name |
|---|---|---|
| bg | `#fff6ec` | Warm paper |
| bg2 | `#f9ecdc` | Sunned paper |
| card | `#fffdf8` | Rice paper |
| tint | `#fbe8d4` | Lantern glow |
| ink | `#2b1f1a` | Lacquer ink |
| inkSoft | `#55423a` | Warm umber |
| muted | `#8a6f5f` | Clay |
| accent | `#c8321e` | Cinnabar |
| accentDeep | `#7c1a10` | Deep lacquer red |
| highlight | `#e9b95c` | Gold leaf |
| hairline | `#e5d3bd` / soft `#efe1cf` | Paper crease |

**Type.** Display `var(--font-bebas)` (poster energy, tight leading) · Body
`var(--font-dm)`. Bilingual copy is native to this style — Chinese section titles
(`nameAlt` pattern) sit beside the Bebas display, set in the body stack.

## Mood lexicon

lantern-lit · cinnabar and gold · paper craft · silk banners (blank) · night market
glow · drummers and lion dance · layered pattern · handmade abundance · procession

**Anti-lexicon:** minimal, muted, pastel, restrained; also avoid museum-glass distance
— this style is close, warm, crowded with craft.

## Light & materials

Lantern and festoon glow at blue hour; daylight versions saturated and warm. Red silk,
gilded paper, lacquer, bamboo, marigold and peony abundance. This is the one style
where illustration is allowed — for *texture slots only* (paper-cut patterns, gilded
motifs), never for heroes.

**Extra text hazard:** lanterns, banners and signage invite generated calligraphy —
every prompt must say "blank unmarked lanterns/banners" and carry `calligraphy,
characters, lettering` in negatives.

## Prompt templates

**Hero (21:9, `seedream_v4_5`):**
> Cinematic photograph of {environment — e.g. "a courtyard at blue hour strung with
> dozens of glowing red paper lanterns, all blank and unmarked"}, cinnabar silk and
> gilded paper details, long banquet tables with peony and marigold abundance, warm
> lantern glow against deep dusk, layered depth, festival richness, film grain
> — negatives: canon + `calligraphy, characters, lettering on lanterns or banners, faces, daylight flatness, pastel tones`

**Gallery tile (4:5, `seedream_v4_5`):**
> Editorial detail of {subject — "blank red paper lanterns clustered, one lit" /
> "gilded paper-cut motifs scattered on cinnabar silk"}, warm practical glow, shallow
> depth of field

**Texture (21:9, illustration permitted):**
> Ornamental paper-cut pattern texture in cinnabar red and gold leaf on warm paper,
> abstract repeating craft motif, no figures, no characters, no lettering

## Shot list (library)

1. Hero — lantern courtyard at blue hour (21:9)
2. Hero — banquet under red silk canopy, gold candlelight (21:9)
3. Tile — blank lantern cluster (4:5)
4. Tile — peony + marigold arrangement on lacquer (4:5)
5. Tile — lion-dance silk (blank), motion blur (4:5)
6. Tile — tea service in gilded ceramics (4:5)
7. Texture — paper-cut pattern, cinnabar + gold (21:9)
