import { z } from "zod";

/**
 * Proposal schema — the single contract shared by:
 *  - the AI parse route (natural language → Proposal JSON)
 *  - the admin quote builder (form editing)
 *  - the client-facing renderer at /p/[slug]
 *  - dev mode, where JSON is hand-authored in a Claude session and imported
 *
 * Design principle: events are case-dependent, so a proposal is an ORDERED
 * ARRAY OF TYPED SECTIONS. Every section is optional, repeatable and
 * reorderable. Human-facing values (dates, guest counts, prices) are stored
 * as display-ready strings or simple ranges — flexibility beats strictness.
 */

/* ---------------------------------- primitives --------------------------------- */

/** Dollar range. `max` absent → flat amount. */
export const PriceRange = z.object({
  min: z.number(),
  max: z.number().optional(),
});
export type TPriceRange = z.infer<typeof PriceRange>;

export const ColorSwatch = z.object({
  name: z.string(),
  hex: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});
export type TColorSwatch = z.infer<typeof ColorSwatch>;

export const ImageAsset = z.object({
  url: z.string(),
  alt: z.string().default(""),
  /** "google" = imported from a linked Google Business Profile / Places listing */
  source: z.enum(["upload", "library", "higgsfield", "external", "google"]).default("upload"),
  /** prompt used, when AI-generated */
  prompt: z.string().optional(),
  /** photographer / listing credit — required for Google Places photos */
  attribution: z.string().optional(),
  /** legacy images with typography baked into the pixels — renderer must not overlay text */
  hasBakedText: z.boolean().optional(),
});
export type TImageAsset = z.infer<typeof ImageAsset>;

/** Editorial pull quote — set large across the chapter, with a hairline rule. */
export const PullQuote = z.object({
  text: z.string(),
  attribution: z.string().optional(), // "— the brief, first call"
});
export type TPullQuote = z.infer<typeof PullQuote>;

export const Fact = z.object({
  label: z.string(), // "DATE", "DRESS CODE", …
  value: z.string(),
});
export type TFact = z.infer<typeof Fact>;

/* ----------------------------------- sections ---------------------------------- */

const sectionBase = {
  id: z.string(),
  /** kept in the document but not rendered */
  hidden: z.boolean().optional(),
};

export const CoverSection = z.object({
  ...sectionBase,
  type: z.literal("cover"),
  eyebrow: z.string().default("Event Proposal · Prepared by Kira Jia Events"),
  /** DATE / TIME / LOCATION / GUEST COUNT row */
  facts: z.array(Fact).default([]),
  /** full-bleed cover background — renderer applies a scrim; type stays HTML */
  background: ImageAsset.optional(),
});

export const VisionSection = z.object({
  ...sectionBase,
  type: z.literal("vision"),
  eyebrow: z.string().default("The Vision"),
  title: z.string(),
  /** narrative; blank line splits paragraphs */
  body: z.string(),
  /** EVENT TYPE / DRESS CODE / FORMAT row */
  facts: z.array(Fact).default([]),
  /** full-width editorial spread image under the narrative */
  image: ImageAsset.optional(),
  /** one line of the pitch, set huge under the spread */
  quote: PullQuote.optional(),
});

export const PaletteOption = z.object({
  name: z.string(), // "Blue Hour"
  badge: z.string().optional(), // "Option 01 — Recommended"
  description: z.string(),
  colors: z.array(ColorSwatch).default([]),
  /** wide cinematic hero for the theme */
  hero: ImageAsset.optional(),
  /** single mood-board collage image */
  board: ImageAsset.optional(),
  /** alternative to `board`: individual tiles laid out by the renderer */
  gallery: z.array(ImageAsset).default([]),
});
export type TPaletteOption = z.infer<typeof PaletteOption>;

export const PaletteSection = z.object({
  ...sectionBase,
  type: z.literal("palette"),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  intro: z.string().optional(),
  options: z.array(PaletteOption).min(1),
});

export const VenueItem = z.object({
  name: z.string(),
  area: z.string().optional(), // "One Madison Ave · Flatiron"
  description: z.string(),
  tags: z.array(z.string()).default([]),
  /** spec strip under the description — CAPACITY / RENTAL / SOUND / AVAILABILITY */
  facts: z.array(Fact).optional(),
  image: ImageAsset.optional(),
  /** Google Places id when the venue is linked to a real listing */
  placeId: z.string().optional(),
});
export type TVenueItem = z.infer<typeof VenueItem>;

export const VenuesSection = z.object({
  ...sectionBase,
  type: z.literal("venues"),
  eyebrow: z.string().default("Venue"),
  title: z.string().default("Shortlisted Spaces"),
  intro: z.string().optional(),
  items: z.array(VenueItem),
});

export const MomentsSection = z.object({
  ...sectionBase,
  type: z.literal("moments"),
  eyebrow: z.string().default("Signature Moments"),
  title: z.string(),
  intro: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      /** image-led vignette — renderer leads with the image when present */
      image: ImageAsset.optional(),
    })
  ),
});

export const RunOfShowSection = z.object({
  ...sectionBase,
  type: z.literal("runOfShow"),
  eyebrow: z.string().default("Run of Show"),
  title: z.string().default("Night Overview"),
  intro: z.string().optional(),
  items: z.array(
    z.object({
      time: z.string(), // "7:30 PM"
      title: z.string(),
      description: z.string().optional(),
      /** act header — consecutive items sharing a phase are grouped under it */
      phase: z.string().optional(), // "Act I — Arrival"
    })
  ),
});

export const LineItemBadge = z.enum(["UPGRADE", "ADD-ON", "INCLUDED", "OPTIONAL"]);
export const LineItem = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: PriceRange.optional(),
  /** freeform display override — "Complimentary", "TBD" */
  priceText: z.string().optional(),
  badge: LineItemBadge.optional(),
  /** starred note under the item — "★ You will be charged $9,000" */
  note: z.string().optional(),
});
export type TLineItem = z.infer<typeof LineItem>;

export const InvestmentOption = z.object({
  name: z.string(), // "Option A"
  tagline: z.string().optional(),
  /** displayed header/total range; use computeOptionTotal() to derive */
  total: PriceRange.optional(),
  items: z.array(LineItem),
});
export type TInvestmentOption = z.infer<typeof InvestmentOption>;

export const InvestmentSection = z.object({
  ...sectionBase,
  type: z.literal("investment"),
  eyebrow: z.string().default("Investment"),
  title: z.string(),
  intro: z.string().optional(),
  /** italic bordered callout — commitments/assumptions */
  disclaimer: z.string().optional(),
  options: z.array(InvestmentOption).min(1),
  footnote: z.string().optional(),
});

export const ScopeSection = z.object({
  ...sectionBase,
  type: z.literal("scope"),
  eyebrow: z.string().default("What's Included"),
  title: z.string().default("Planning Scope"),
  intro: z.string().optional(),
  items: z.array(z.string()),
  /** grouped service index — when present, renders instead of the flat list */
  groups: z
    .array(
      z.object({
        title: z.string(), // "Planning & Design"
        blurb: z.string().optional(),
        items: z.array(z.string()),
      })
    )
    .optional(),
});

/** Wedding service tiers (Day-of / Partial / Full) — also usable for packages */
export const ServiceTier = z.object({
  name: z.string(),
  nameAlt: z.string().optional(), // e.g. 婚礼当日协调
  description: z.string(),
  includes: z.array(z.string()).default([]),
  price: z.string().optional(), // freeform: "Begins at $800"
  badge: z.string().optional(),
});
export type TServiceTier = z.infer<typeof ServiceTier>;

export const ServicesSection = z.object({
  ...sectionBase,
  type: z.literal("services"),
  eyebrow: z.string().default("Services"),
  title: z.string(),
  intro: z.string().optional(),
  tiers: z.array(ServiceTier),
});

export const ClosingSection = z.object({
  ...sectionBase,
  type: z.literal("closing"),
  /** quiet full-bleed texture behind the closing — heavily scrimmed */
  texture: ImageAsset.optional(),
  title: z.string().default("Ready to move forward?"),
  body: z
    .string()
    .default("Review, confirm your option, and sign the agreement to secure the date."),
  contactName: z.string().default("Kira Jia"),
  contactEmail: z.string().default("kira@kirajiaevents.com"),
  website: z.string().default("kirajiaevents.com"),
});

/** escape hatch for anything case-dependent that has no dedicated type */
export const CustomSection = z.object({
  ...sectionBase,
  type: z.literal("custom"),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
  /**
   * item layout — "vignettes" (default): image-led moment cards;
   * "index": dense two-column numbered register (checklists, logistics);
   * "schedule": tabular meta | title | detail rows (calendars, staffing charts)
   */
  variant: z.enum(["vignettes", "index", "schedule"]).optional(),
  items: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        /** left column in "schedule", right-aligned tag in "index" — "T-8 WKS", "×2" */
        meta: z.string().optional(),
        image: ImageAsset.optional(),
      })
    )
    .default([]),
  /** full-width chapter frontispiece between opener and items */
  image: ImageAsset.optional(),
  quote: PullQuote.optional(),
});

export const Section = z.discriminatedUnion("type", [
  CoverSection,
  VisionSection,
  PaletteSection,
  VenuesSection,
  MomentsSection,
  RunOfShowSection,
  InvestmentSection,
  ScopeSection,
  ServicesSection,
  ClosingSection,
  CustomSection,
]);
export type TSection = z.infer<typeof Section>;
export type SectionType = TSection["type"];

/* ------------------------------------ theme ------------------------------------ */

export const ThemeStyle = z.enum([
  "classic-kj",
  "noir",
  "botanical",
  "editorial",
  "festival",
  "custom",
]);
export type TThemeStyle = z.infer<typeof ThemeStyle>;

/** Renderer design tokens. All optional — omitted tokens fall back to the
 *  style preset (see lib/proposal/themes.ts), then to the classic-kj CSS. */
export const ThemeTokens = z.object({
  bg: z.string().optional(),
  bg2: z.string().optional(),
  card: z.string().optional(),
  tint: z.string().optional(),
  ink: z.string().optional(),
  inkSoft: z.string().optional(),
  muted: z.string().optional(),
  accent: z.string().optional(),
  accentDeep: z.string().optional(),
  highlight: z.string().optional(),
  hairline: z.string().optional(),
  hairlineSoft: z.string().optional(),
  /** full font-family stacks built on loaded font CSS vars — never URLs */
  fontDisplay: z.string().optional(),
  fontBody: z.string().optional(),
  /** CSS filter applied to the KJ monogram (dark themes invert it) */
  monogramFilter: z.string().optional(),
});
export type TThemeTokens = z.infer<typeof ThemeTokens>;

export const Theme = z.object({
  style: ThemeStyle.default("classic-kj"),
  /** per-document overrides on top of the preset */
  tokens: ThemeTokens.optional(),
});
export type TTheme = z.infer<typeof Theme>;

/* ----------------------------------- proposal ---------------------------------- */

export const EventMeta = z.object({
  title: z.string(), // "Graduation & Going Away Party"
  type: z
    .enum([
      "wedding",
      "birthday",
      "graduation",
      "corporate",
      "private",
      "festival",
      "cultural",
      "other",
    ])
    .default("other"),
  /** display-ready strings — case-dependent formats welcome */
  date: z.string().optional(), // "Saturday, May 16, 2026"
  time: z.string().optional(), // "7:30 PM — 12:00 AM"
  location: z.string().optional(), // "Manhattan, New York"
  guests: z.string().optional(), // "60–80 Guests"
});
export type TEventMeta = z.infer<typeof EventMeta>;

export const Proposal = z.object({
  id: z.string(),
  /** public URL path segment — unguessable */
  slug: z.string(),
  status: z.enum(["draft", "sent", "archived"]).default("draft"),
  createdAt: z.string(),
  updatedAt: z.string(),
  client: z.object({
    name: z.string(),
    email: z.string().optional(),
  }),
  event: EventMeta,
  confidential: z.boolean().default(true),
  /** absent → classic-kj house style */
  theme: Theme.optional(),
  sections: z.array(Section),
});
export type TProposal = z.infer<typeof Proposal>;

/* ----------------------------------- helpers ----------------------------------- */

export function formatPriceRange(p: TPriceRange): string {
  const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
  return p.max != null && p.max !== p.min ? `${fmt(p.min)} — ${fmt(p.max)}` : fmt(p.min);
}

/** Sum line items into a display total. Items without price are skipped. */
export function computeOptionTotal(option: TInvestmentOption): TPriceRange {
  let min = 0;
  let max = 0;
  for (const item of option.items) {
    if (!item.price) continue;
    min += item.price.min;
    max += item.price.max ?? item.price.min;
  }
  return { min, max };
}

const SLUG_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";
export function randomSlugSuffix(len = 8): string {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < bytes.length; i++) out += SLUG_ALPHABET[bytes[i] % SLUG_ALPHABET.length];
  return out;
}

export function makeSlug(clientName: string): string {
  const base = clientName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "proposal"}-${randomSlugSuffix()}`;
}

export function newSectionId(): string {
  return "s_" + randomSlugSuffix(6);
}

/** Parse unknown JSON into a Proposal, throwing with readable issues. */
export function parseProposal(data: unknown): TProposal {
  return Proposal.parse(data);
}

/** Blank-but-sensible starter document for the admin "New proposal" action. */
export function createProposalScaffold(input?: {
  clientName?: string;
  eventTitle?: string;
}): TProposal {
  const clientName = input?.clientName?.trim() || "New Client";
  const eventTitle = input?.eventTitle?.trim() || "Untitled Event";
  const now = new Date().toISOString();
  return Proposal.parse({
    id: "p_" + randomSlugSuffix(10),
    slug: makeSlug(clientName),
    status: "draft",
    createdAt: now,
    updatedAt: now,
    client: { name: clientName },
    event: { title: eventTitle, type: "other" },
    confidential: true,
    sections: [
      { id: newSectionId(), type: "cover", facts: [] },
      { id: newSectionId(), type: "vision", title: "The Vision", body: "" },
      {
        id: newSectionId(),
        type: "investment",
        title: "Investment",
        options: [{ name: "Option A", items: [] }],
      },
      { id: newSectionId(), type: "scope", items: [] },
      { id: newSectionId(), type: "closing" },
    ],
  });
}
