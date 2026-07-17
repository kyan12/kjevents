import type { TProposal } from "./schema";

/**
 * Styled sample — BOTANICAL. "Felicity & Leon": a full-planning estate
 * wedding at The Mansion at Glen Cove, blending a Western garden wedding
 * with Chinese traditions. Content grounded in the real featured wedding
 * described in new_plan.md, recast as a prospective proposal. Demonstrates
 * the botanical theme, a custom "Cultural Traditions" section, and a
 * single-option full-production investment.
 */
export const felicityProposal: TProposal = {
  id: "seed-felicity-leon",
  slug: "felicity-leon-demo",
  status: "draft",
  createdAt: "2026-07-16T12:00:00.000Z",
  updatedAt: "2026-07-16T12:00:00.000Z",
  client: { name: "Felicity & Leon" },
  event: {
    title: "An Estate Wedding at Glen Cove",
    type: "wedding",
    date: "Saturday, September 12, 2026",
    time: "3:00 PM — 11:00 PM",
    location: "The Mansion at Glen Cove, Long Island",
    guests: "120 Guests",
  },
  confidential: true,
  theme: { style: "botanical" },
  sections: [
    {
      id: "s_cover",
      type: "cover",
      eyebrow: "Wedding Proposal · Prepared by Kira Jia Events",
      facts: [
        { label: "Date", value: "Saturday, September 12, 2026" },
        { label: "Time", value: "3:00 PM — 11:00 PM" },
        { label: "Location", value: "The Mansion at Glen Cove" },
        { label: "Guest Count", value: "120 Guests" },
      ],
      background: {
        url: "/library/botanical/cover--estate-lawn--t1.jpg",
        alt: "The estate lawn in September golden hour — old oaks, long shadows, the mansion hazy beyond",
        source: "library",
      },
    },
    {
      id: "s_vision",
      type: "vision",
      eyebrow: "The Vision",
      title: "The Garden Heirloom",
      body: "A late-summer estate wedding that feels inherited rather than produced. Ceremony on the great lawn under the old trees, tea ceremony in the mansion's parlor with both families close, dinner under glass and greenery as the light goes long. Two cultures are not staged side by side — they are woven through one continuous day, so that the tea ceremony and the first dance belong to the same wedding.\n\nEverything loose, garden-cut, and unforced: linen, clay, herbs among the flowers. The mansion's architecture does the grandeur; we do the warmth.",
      facts: [
        { label: "Event Type", value: "Estate Wedding — Full Planning" },
        { label: "Setting", value: "Lawn ceremony · Parlor tea ceremony · Terrace dinner" },
        { label: "Traditions", value: "Western ceremony woven with Chinese customs" },
      ],
      image: {
        url: "/library/botanical/vision--conservatory-table--t1.jpg",
        alt: "Dinner under glass and greenery — clay vessels, garden-cut stems, September light",
        source: "library",
      },
      quote: {
        text: "The mansion's architecture does the grandeur; we do the warmth.",
        attribution: "The design brief",
      },
    },
    {
      id: "s_palette",
      type: "palette",
      eyebrow: "Art Direction",
      title: "The Look",
      intro: "Built from the estate itself: stone, old trees, September light.",
      options: [
        {
          name: "Meadow & Moss",
          badge: "Option 01 — Recommended",
          description: "Ecru linen and paper, greens running from dry sage to forest, terracotta warmth in the clay vessels and late-summer florals. Arrangements stay garden-cut and loose — stems visible, herbs among the roses, nothing domed or stiff.",
          colors: [
            { name: "Ecru", hex: "#f4f1e8" },
            { name: "Moss", hex: "#4a5d3a" },
            { name: "Forest", hex: "#2e3b26" },
            { name: "Terracotta", hex: "#b26e4b" },
            { name: "Dried Grass", hex: "#e9dfc8" },
          ],
          hero: {
            url: "/library/botanical/hero--estate-oak-table--t1.jpg",
            alt: "Long wedding table under an old oak on an estate lawn, meadow florals in clay vessels",
            source: "library",
          },
          gallery: [
            {
              url: "/library/botanical/tile--clay-pitcher--t1.jpg",
              alt: "Garden-cut flowers and herbs loose in a raw clay pitcher on ecru linen",
              source: "library",
            },
            {
              url: "/library/botanical/tile--place-card--t1.jpg",
              alt: "Rosemary sprig across a blank card on ecru linen",
              source: "library",
            },
            {
              url: "/library/botanical/tile--ceremony-arch--t1.jpg",
              alt: "Loose wildflower ceremony arch against an old stone estate wall",
              source: "library",
            },
          ],
        },
      ],
    },
    {
      id: "s_traditions",
      type: "custom",
      eyebrow: "Heritage",
      title: "Cultural Traditions, Woven Through",
      body: "The customs are not an interlude — they are load-bearing. We plan each one with the same production care as the ceremony itself, and brief every vendor so nothing needs explaining on the day.",
      items: [
        {
          title: "Tea Ceremony · 敬茶",
          description: "Held in the mansion's parlor between ceremony and cocktail hour — both families seated, elders honored, tea service in gilded ceramics we source and rehearse.",
        },
        {
          title: "Double Happiness Details",
          description: "囍 worked quietly into stationery, embroidery, and the cake — sourced globally, ordered and managed by us.",
        },
        {
          title: "The Qipao Change",
          description: "A styled second look for the evening reception, with a private changing suite and a timed re-entrance the room will remember.",
        },
        {
          title: "Bilingual Hosting",
          description: "Every toast, cue, and vendor call runs in English and Mandarin — both sides of the room fully inside the day, never watching it.",
        },
      ],
    },
    {
      id: "s_moments",
      type: "moments",
      eyebrow: "Signature Moments",
      title: "What the Day Remembers",
      items: [
        {
          title: "First Look Under the Oak",
          description: "Before guests arrive — the estate's oldest tree, the two of you, one photographer, ten unhurried minutes.",
          image: {
            url: "/library/botanical/moment--first-look-oak--t1.jpg",
            alt: "The estate's oldest oak at first light — the quiet before the first look",
            source: "library",
          },
        },
        {
          title: "The Lawn Ceremony",
          description: "Chairs in soft arcs facing the water, a loose wildflower arch, string quartet carrying the processional.",
        },
        {
          title: "Tea in the Parlor",
          description: "The quietest, most important room of the day — elders seated, tea offered, names spoken in both languages.",
          image: {
            url: "/library/botanical/moment--tea-ceremony--t1.jpg",
            alt: "Gilded deep-red tea service in the parlor — window light, silk, lacquer",
            source: "library",
          },
        },
        {
          title: "Golden Hour on the Terrace",
          description: "Dinner pauses itself around 6:40 as the light goes long across the lawn; portraits happen without being scheduled.",
        },
        {
          title: "The Re-Entrance",
          description: "Felicity in the qipao, doors opened on cue, the band already two bars in.",
        },
        {
          title: "The Lantern Send-Off",
          description: "The drive lined with paper lanterns as cars arrive — the estate glowing behind you in the last photograph of the night.",
          image: {
            url: "/library/botanical/moment--lantern-drive--t1.jpg",
            alt: "Paper lanterns lining the estate drive at dusk",
            source: "library",
          },
        },
      ],
    },
    {
      id: "s_ros",
      type: "runOfShow",
      eyebrow: "Run of Show",
      title: "Day Overview",
      items: [
        { time: "12:00 PM", phase: "Before the Bells", title: "Vendor load-in & styling", description: "Florals, tabletop, and ceremony build; bridal suite opens." },
        { time: "2:15 PM", title: "First look", description: "Under the oak, before the estate fills." },
        { time: "3:30 PM", phase: "The Ceremonies", title: "Ceremony on the great lawn", description: "Thirty minutes, string quartet, vows in both languages where you choose." },
        { time: "4:15 PM", title: "Tea ceremony · 敬茶", description: "Immediate family in the parlor while guests begin cocktail hour on the terrace." },
        { time: "5:00 PM", phase: "The Celebration", title: "Cocktail hour", description: "Lawn games down by the water, raw bar, the quartet gone acoustic-modern." },
        { time: "6:15 PM", title: "Dinner under glass", description: "Long tables, garden-cut centerpieces, toasts between courses — bilingual, brief, rehearsed with us." },
        { time: "8:30 PM", title: "The re-entrance & first dance", description: "The qipao moment, then the floor opens." },
        { time: "10:45 PM", title: "Lantern send-off", description: "Last song, lanterns lit along the drive, cars staged and ready." },
      ],
    },
    {
      id: "s_rainplan",
      type: "custom",
      eyebrow: "Contingency",
      title: "The Rain Plan",
      body: "September on the Sound is generous until it isn't. The plan below exists so that a grey forecast changes the furniture, never the wedding — every decision is pre-made, priced, and rehearsed, and none of it lands on your family on the morning.",
      image: {
        url: "/library/botanical/spread--sailcloth-rain--t1.jpg",
        alt: "The rain plan, unbothered — sailcloth glowing over the lawn, the weather doing its worst",
        source: "library",
      },
      variant: "index",
      items: [
        {
          title: "The call",
          description: "go/no-go with the estate at 9:00 AM; the ceremony flips to the conservatory, arcs of chairs already mapped.",
          meta: "9:00 AM",
        },
        {
          title: "The sailcloth reserve",
          description: "a tent hold with the rental house until seven days out — released only on your sign-off, never by default.",
          meta: "Held to T-7",
        },
        {
          title: "Guest comfort",
          description: "umbrella valets at the cars, pashminas at the chairs, a dry route walked end to end.",
          meta: "80 umbrellas",
        },
        {
          title: "The photographs",
          description: "a parlor and veranda plan pre-scouted with the photographer — rain light is a look, not a loss.",
          meta: "Pre-scouted",
        },
        {
          title: "Vendors under cover",
          description: "power, florals, and the quartet each have an assigned covered position and a move order.",
          meta: "Assigned",
        },
        {
          title: "The tea ceremony",
          description: "already indoors by design — the one part of the day the weather was never allowed to touch.",
          meta: "Unmoved",
        },
      ],
    },
    {
      id: "s_calendar",
      type: "custom",
      eyebrow: "Production Calendar",
      title: "Eight Weeks, Unhurried",
      body: "A September date on a July signature is a sprint — this is how it stays calm.",
      variant: "schedule",
      items: [
        {
          meta: "Week 1",
          title: "Contracts",
          description: "Estate, catering, quartet, and photographer locked; deposits placed.",
        },
        {
          meta: "Week 2",
          title: "Design lock",
          description: "Mood board approved, florals contracted, tabletop sampled on the terrace.",
        },
        {
          meta: "Week 3",
          title: "Invitations out",
          description: "RSVP opens with the dietary sweep — bilingual suite, printed follow-up.",
        },
        {
          meta: "Week 4",
          title: "Detail sourcing",
          description: "Double-happiness suite, tea service, and favors ordered — global lead times start now.",
        },
        {
          meta: "Week 5",
          title: "Tasting & walkthrough",
          description: "Menu finalized at the estate; tea ceremony rehearsed in the parlor it will live in.",
        },
        {
          meta: "Week 6",
          title: "Fittings & choreography",
          description: "The qipao change timed to the minute; the re-entrance blocked with the band.",
        },
        {
          meta: "Week 7",
          title: "Final counts",
          description: "Seating, place cards, car staging, rain-plan criteria agreed in writing.",
        },
        {
          meta: "Week 8",
          title: "Wedding week",
          description: "Vendor call sheet issued, family briefing in both languages, rehearsal on Thursday.",
        },
      ],
    },
    {
      id: "s_investment",
      type: "investment",
      eyebrow: "Investment",
      title: "The Numbers",
      intro: "One complete plan for the day as envisioned — full production, both traditions, nothing left to add later.",
      disclaimer: "The Mansion at Glen Cove's venue and catering minimums for a Saturday in September anchor this budget. We commit to keeping the final spend within the approved range.",
      options: [
        {
          name: "The Estate Plan",
          tagline: "Full planning & production",
          total: { min: 185500, max: 218500 },
          items: [
            {
              name: "Venue + Catering — The Mansion at Glen Cove",
              description: "Saturday estate hire, plated dinner, staffing.",
              price: { min: 68000, max: 78000 },
            },
            { name: "Beverage Program", price: { min: 14000, max: 17000 } },
            {
              name: "Décor, Florals & Design",
              description: "Ceremony arch, parlor styling, terrace dinner, lantern drive.",
              price: { min: 28000, max: 34000 },
            },
            { name: "Production — Lighting, Sound & Staging", price: { min: 12000, max: 15000 } },
            { name: "Rentals & Tabletop", price: { min: 9000, max: 11000 } },
            { name: "Photography + Videography", price: { min: 12000, max: 14000 } },
            {
              name: "Entertainment — Quartet, Band & DJ",
              price: { min: 9500, max: 12000 },
            },
            {
              name: "Stationery & Global Detail Sourcing",
              description: "Double-happiness suite, tea service, favors — sourced and managed end to end.",
              price: { min: 4500, max: 6000 },
            },
            { name: "Transportation & Guest Logistics", price: { min: 3500, max: 4500 } },
            { name: "Service Charges + Admin Fees + Tax", price: { min: 9000, max: 11000 } },
            {
              name: "Full Planning Fee · 全程婚礼策划",
              badge: "INCLUDED",
              price: { min: 16000 },
              note: "★ You will be charged $16,000",
            },
          ],
        },
      ],
      footnote: "Ranges reflect final floral scope and guest count. Totals are the sum of line items shown.",
    },
    {
      id: "s_scope",
      type: "scope",
      eyebrow: "What's Included",
      title: "Full Planning Scope",
      intro: "The full-planning fee covers three kinds of work — the plan, the heritage, and the day.",
      items: [],
      groups: [
        {
          title: "Planning & Design",
          blurb: "The architecture of the day.",
          items: [
            "Comprehensive planning, design, and event production from concept to send-off",
            "Custom mood board and design development",
            "Curated vendor sourcing, vetting, booking, and management",
            "Budget management against the approved range",
            "Weekly planning sessions and full timeline authorship",
          ],
        },
        {
          title: "Heritage & Family",
          blurb: "Both cultures, one wedding.",
          items: [
            "Cultural consultation and integration of Chinese traditions",
            "Development and global sourcing of stationery and wedding details",
            "Bilingual coordination with vendors, guests, and family throughout",
          ],
        },
        {
          title: "The Day Itself",
          blurb: "September 12, held gently.",
          items: [
            "Wedding day management with full-service coordination coverage",
            "Rain-plan authorship, rehearsal, and the morning-of call",
            "Vendor call sheet, load-in supervision, and estate handback",
          ],
        },
      ],
    },
    {
      id: "s_closing",
      type: "closing",
      texture: {
        url: "/library/botanical/closing--linen-herb--t1.jpg",
        alt: "Ecru linen with shadows of trailing greenery",
        source: "library",
      },
      title: "Ready to move forward?",
      body: "Confirm the plan and we secure September 12 with the estate. 随时联系我们 — happy to continue in English or Chinese.",
      contactName: "Kira Jia",
      contactEmail: "kira@kirajiaevents.com",
      website: "kirajiaevents.com",
    },
  ],
};
