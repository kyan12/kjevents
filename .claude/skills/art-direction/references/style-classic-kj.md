# Style — `classic-kj` (house default)

**Essence.** The Kira Jia house look, extracted from the Edwin Tang reference deck:
warm cream grounds, garnet accents, champagne light. Refined East-meets-West romance —
"elevated without trying too hard." The default for weddings and most social events.

## Theme tokens

| Token | Hex | Name |
|---|---|---|
| bg | `#f3efea` | Cream |
| bg2 | `#ece6dd` | Warm sand |
| card | `#fcfaf7` | Porcelain |
| tint | `#f8efe6` | Blush |
| ink | `#2f2a28` | Espresso ink |
| inkSoft | `#55504b` | Soft umber |
| muted | `#7a6b61` | Taupe |
| accent | `#6e0f17` | Garnet |
| accentDeep | `#5a2b31` | Maroon |
| highlight | `#f3e4d4` | Champagne |
| hairline | `#ddd3c6` / soft `#e7dfd4` | Linen rule |

**Type.** Display `var(--font-cormorant)` (Cormorant Garamond, 300/600 + italic for
grace notes) · Body `var(--font-jost)` (light, generous tracking on labels).
`var(--font-hello-paris)` allowed for a single script flourish (names on covers).

## Mood lexicon

soft-focus romance · candlelight and linen · garden-room · gilded but quiet ·
heirloom · silk, bone china, taper candles · champagne hour · first-bloom

**Anti-lexicon (never):** rustic, boho, mason jar, fairy lights, glam, sparkle, luxe
(the word), moody (that's noir's job).

## Light & materials

Golden-hour window light or dense taper candlelight; linen, silk, bone china, aged
brass, garden roses, stone fruit. Whites are warm, shadows are umber never gray.

## Prompt templates

**Hero (21:9, `seedream_v4_5`):**
> Editorial photograph of {environment — e.g. "a long banquet table in a glass garden
> room at golden hour"}, cream linen and porcelain place settings, garnet and champagne
> floral arrangements of garden roses and stone fruit, dense taper candlelight, warm
> soft-focus atmosphere, symmetrical wide composition with generous negative space,
> shot on medium format film
> — negatives: canon + `people, faces, cool tones, gray shadows`

**Gallery tile (4:5, `seedream_v4_5`; `soul_2` if hands/figures carry it):**
> Macro editorial detail of {subject — e.g. "a garnet silk ribbon across a cream
> place card, blank paper"}, champagne candlelight, shallow depth of field, warm film
> grain
> — negatives: canon (+ `people, faces` when empty)

**Texture (21:9):**
> Near-abstract close-up of {material — "cream silk catching warm window light" /
> "champagne-toned rose petals scattered on linen"}, soft even light, subtle grain

## Shot list (library)

1. Hero — garden-room banquet at golden hour (21:9)
2. Hero — candlelit ballroom, empty, moments before guests (21:9)
3. Tile — place setting detail, garnet ribbon (4:5)
4. Tile — garden roses + stone fruit arrangement (4:5)
5. Tile — champagne coupes on a silver tray, candlelight (4:5)
6. Tile — silk drape + taper candles (4:5)
7. Texture — cream silk, warm light (21:9)
