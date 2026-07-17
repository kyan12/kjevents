import type { TProposal } from "./schema";

/**
 * Styled sample — NOIR. "Marcus at Forty": a supper-club 40th birthday,
 * downtown Manhattan. Demonstrates the dark theme, Bebas display, and a
 * two-option investment spread. Content mirrors docs/builder/simulations.md.
 */
export const marcusProposal: TProposal = {
  id: "seed-marcus-forty",
  slug: "marcus-at-forty-demo",
  status: "draft",
  createdAt: "2026-07-16T12:00:00.000Z",
  updatedAt: "2026-07-16T12:00:00.000Z",
  client: { name: "Marcus" },
  event: {
    title: "Marcus at Forty",
    type: "birthday",
    date: "Saturday, May 16, 2026",
    time: "7:30 PM — 1:00 AM",
    location: "Downtown Manhattan, NYC",
    guests: "60–80 Guests",
  },
  confidential: true,
  theme: { style: "noir" },
  sections: [
    {
      id: "s_cover",
      type: "cover",
      eyebrow: "Event Proposal · Prepared by Kira Jia Events",
      facts: [
        { label: "Date", value: "Saturday, May 16, 2026" },
        { label: "Time", value: "7:30 PM — 1:00 AM" },
        { label: "Location", value: "Downtown Manhattan, NYC" },
        { label: "Guest Count", value: "60–80 Guests" },
      ],
      background: {
        url: "/library/noir/cover--supper-club--t1.jpg",
        alt: "After-hours supper club in near-darkness — candle pools, brass rails, oxblood banquettes",
        source: "library",
      },
    },
    {
      id: "s_vision",
      type: "vision",
      eyebrow: "The Vision",
      title: "The Supper Club",
      body: "Dinner first, party second. The room is dark and warm — lacquer, brass, oxblood leather — and the night moves like a set list: a martini cart at the door, a long seated supper under candlelight, then the tables pull back and a live trio takes the floor. No step-and-repeat, no crowd control, no rager. Sixty to eighty people Marcus actually knows, in a room that feels like it has always been there.",
      facts: [
        { label: "Event Type", value: "40th Birthday — Seated Supper" },
        { label: "Dress Code", value: "After Dark — cocktail, no ties" },
        { label: "Format", value: "Seated dinner → lounge takeover" },
      ],
      image: {
        url: "/library/noir/vision--long-table--t1.jpg",
        alt: "One long candlelit supper table receding into darkness — the night, before anyone arrives",
        source: "library",
      },
      quote: {
        text: "Dinner first, party second — the night moves like a set list, not a schedule.",
        attribution: "The premise, from our first call",
      },
    },
    {
      id: "s_palette",
      type: "palette",
      eyebrow: "Art Direction",
      title: "The Look",
      intro: "One direction, held with discipline: near-black grounds, candle pools, brass catching the light.",
      options: [
        {
          name: "After Hours",
          badge: "Option 01 — Recommended",
          description: "Lacquer, smoke and brass. The room stays two shades darker than comfortable, so every candle cluster and brass rail reads like a spotlight. Florals are burgundy dahlias on black — low, dense, no filler.",
          colors: [
            { name: "Plum Black", hex: "#141114" },
            { name: "Brass", hex: "#b08d57" },
            { name: "Oxblood", hex: "#4a1620" },
            { name: "Smoke", hex: "#8d8175" },
            { name: "Candlelight", hex: "#e8d5b0" },
          ],
          hero: {
            url: "/library/noir/hero--supper-club--t1.jpg",
            alt: "Candlelit supper club interior in plum black and brass, empty corner stage before service",
            source: "library",
          },
          gallery: [
            {
              url: "/library/noir/tile--martini--t1.jpg",
              alt: "Martini in a coupe glass beside a brass shaker on dark marble",
              source: "library",
            },
            {
              url: "/library/noir/tile--banquette--t1.jpg",
              alt: "Oxblood leather banquette beside lit taper candles in brass holders",
              source: "library",
            },
            {
              url: "/library/noir/tile--dark-florals--t2.jpg",
              alt: "Burgundy dahlias and deep red roses in aged brass on a true black ground",
              source: "library",
            },
          ],
        },
      ],
    },
    {
      id: "s_venues",
      type: "venues",
      eyebrow: "Venue",
      title: "Shortlisted Rooms",
      intro: "Five rooms that already live in this palette. Availability for May 16 is pending on all — we move on your pick.",
      items: [
        {
          name: "The Nines",
          area: "9 Great Jones St · NoHo",
          description: "Piano-bar supper club with red velvet and low amber light — the closest existing room to the mood board.",
          tags: ["Supper club", "Live piano"],
          facts: [
            { label: "Capacity", value: "65 seated · 90 flow" },
            { label: "Buyout est.", value: "From $18,000" },
            { label: "Sound", value: "House PA + piano" },
            { label: "May 16", value: "Hold requested" },
          ],
          image: {
            url: "/library/noir/venue--the-nines--t1.jpg",
            alt: "Atmosphere direction for The Nines — red velvet, grand piano, single amber spotlight",
            source: "library",
          },
        },
        {
          name: "The Django",
          area: "2 6th Ave · Tribeca",
          description: "Vaulted brick jazz cellar under the Roxy. Built-in stage and a bar that photographs like a film still.",
          tags: ["Jazz cellar", "Built-in stage"],
          facts: [
            { label: "Capacity", value: "80 seated · 150 flow" },
            { label: "Buyout est.", value: "From $22,000" },
            { label: "Sound", value: "Full stage rig" },
            { label: "May 16", value: "Hold requested" },
          ],
          image: {
            url: "/library/noir/venue--the-django--t1.jpg",
            alt: "Atmosphere direction for The Django — vaulted brick, amber light, waiting stage",
            source: "library",
          },
        },
        {
          name: "Casa Cipriani",
          area: "10 South St · Battery Maritime",
          description: "Members' club polish inside a landmark ferry terminal — jazz café room with harbor views going black at night.",
          tags: ["Members' club", "Harbor views"],
          facts: [
            { label: "Capacity", value: "70 seated · 120 flow" },
            { label: "Access", value: "Member sponsor req." },
            { label: "Sound", value: "House system" },
            { label: "May 16", value: "Inquiry placed" },
          ],
          image: {
            url: "/library/noir/venue--casa-cipriani--t1.jpg",
            alt: "Atmosphere direction for Casa Cipriani — walnut, brass, harbor night beyond the glass",
            source: "library",
          },
        },
        {
          name: "Chez Zou",
          area: "412 W 30th St · Penn District",
          description: "Supper-club theatricality with a working stage and banquettes — made for a seated show that turns into a party.",
          tags: ["Stage", "Banquettes"],
          facts: [
            { label: "Capacity", value: "90 seated · 140 flow" },
            { label: "Buyout est.", value: "From $20,000" },
            { label: "Sound", value: "Stage + engineer" },
            { label: "May 16", value: "Hold requested" },
          ],
          image: {
            url: "/library/noir/venue--chez-zou--t1.jpg",
            alt: "Atmosphere direction for Chez Zou — stage, velvet crescents, rose-amber wash",
            source: "library",
          },
        },
        {
          name: "Gage & Tollner",
          area: "372 Fulton St · Downtown Brooklyn",
          description: "1879 chop-house room, gaslight-era mirrors and brass — if we cross the river, we cross it for this.",
          tags: ["Landmark", "Private floor"],
          facts: [
            { label: "Capacity", value: "70 seated, private floor" },
            { label: "F&B min. est.", value: "From $30,000" },
            { label: "Sound", value: "Amplified to 11 PM" },
            { label: "May 16", value: "Hold requested" },
          ],
          image: {
            url: "/library/noir/venue--gage-tollner--t1.jpg",
            alt: "Atmosphere direction for Gage & Tollner — gaslight-era mirrors, brass sconces, white linen",
            source: "library",
          },
        },
      ],
    },
    {
      id: "s_moments",
      type: "moments",
      eyebrow: "Signature Moments",
      title: "What the Night Remembers",
      items: [
        {
          title: "The Martini Cart",
          description: "Guests are met at the door by a rolling brass cart — ice-cold classics, stirred to order, before coats are even checked.",
          image: {
            url: "/library/noir/moment--martini-cart--t1.jpg",
            alt: "The martini cart at the door — frosted coupes and brass on dark marble",
            source: "library",
          },
        },
        {
          title: "The Table Toast",
          description: "One long candlelit table moment: Marcus's people, three short toasts, no microphone unless the room demands it.",
        },
        {
          title: "The Prince Set",
          description: "At 10:00 the trio shifts gears — Purple Rain on strings, When Doves Cry as a slow burn. The set Marcus doesn't know is coming.",
          image: {
            url: "/library/noir/moment--prince-set--t1.jpg",
            alt: "The stage between sets — haze in a single warm beam, instruments waiting",
            source: "library",
          },
        },
        {
          title: "The Caviar Cart",
          description: "The caviar service he mentioned once and will never forget — rolled tableside during the lounge hours.",
          image: {
            url: "/library/noir/moment--caviar-cart--t1.jpg",
            alt: "Caviar service by candlelight — crystal, mother-of-pearl, crushed ice",
            source: "library",
          },
        },
        {
          title: "Cigar & Amaro Corner",
          description: "A tucked-away corner with amari, a humidor, and permission to disappear from your own party for fifteen minutes.",
        },
        {
          title: "Forty Records",
          description: "Guests each bring the record that reminds them of Marcus — a crate of forty vinyl, played from midnight on.",
        },
      ],
    },
    {
      id: "s_ros",
      type: "runOfShow",
      eyebrow: "Run of Show",
      title: "Night Overview",
      items: [
        {
          time: "7:30 PM",
          phase: "Act I — The Door",
          title: "Doors — martini cart",
          description: "Arrival drinks stirred to order, room at half-light, trio playing standards low.",
        },
        {
          time: "8:15 PM",
          phase: "Act II — The Table",
          title: "Seated supper",
          description: "One long table, family-style courses under taper candles.",
        },
        {
          time: "9:30 PM",
          title: "The toasts",
          description: "Three voices, kept short by design. The kitchen sends dessert as the last glass raises.",
        },
        {
          time: "10:00 PM",
          phase: "Act III — The Floor",
          title: "The Prince Set",
          description: "Tables pull back. The trio turns the dining room into the floor.",
        },
        {
          time: "11:00 PM",
          title: "Lounge takeover",
          description: "Caviar cart rolls, amaro corner opens, DJ or vinyl crate carries the room.",
        },
        {
          time: "12:45 AM",
          title: "Last call & send-off",
          description: "Espresso martinis and cars called. The room ends as it began — dark, warm, unhurried.",
        },
      ],
    },
    {
      id: "s_fineprint",
      type: "custom",
      eyebrow: "Logistics",
      title: "A Night With No Loose Ends",
      body: "The parts of the plan nobody photographs. Each one is owned, timed, and off your plate — this is what coordination coverage actually buys.",
      variant: "index",
      items: [
        {
          title: "Arrivals & coat",
          description: "two greeters and a dedicated rail for eighty; nobody queues in the stairwell.",
          meta: "Staffed ×3",
        },
        {
          title: "The decoy",
          description: "Marcus's calendar holds a fake dinner for six; guests are briefed to stay off socials until the toasts.",
          meta: "Need-to-know",
        },
        {
          title: "Phones & the record",
          description: "one photographer owns the night; a no-flash note sits at each place setting.",
          meta: "One camera",
        },
        {
          title: "Dietary & seating",
          description: "full dietary sweep at RSVP; place cards and table map final three days out.",
          meta: "Lock T-3 days",
        },
        {
          title: "Sound & the neighbors",
          description: "levels set to house spec at sound check; amplified ends per the venue's agreement.",
          meta: "House spec",
        },
        {
          title: "Vendor load-in",
          description: "florals and AV in by 4:00, sound check 5:30, room dressed and lit by 6:45.",
          meta: "By 6:45 PM",
        },
        {
          title: "Cars & the send-off",
          description: "rides staged from 12:30 on the quiet side street — no curb cluster under the marquee.",
          meta: "From 12:30 AM",
        },
        {
          title: "Insurance & permits",
          description: "COI filed with the venue; liquor liability and amplified-sound clearances confirmed in writing.",
          meta: "Filed",
        },
      ],
    },
    {
      id: "s_calendar",
      type: "custom",
      eyebrow: "Production Calendar",
      title: "From Yes to May 16",
      variant: "schedule",
      items: [
        {
          meta: "T-8 wks",
          title: "Venue signed",
          description: "Deposit placed, date locked, menus requested from the chef.",
        },
        {
          meta: "T-6 wks",
          title: "Tasting & the band",
          description: "Menu locked at the tasting; trio contracted, the Prince set list drafted in secret.",
        },
        {
          meta: "T-5 wks",
          title: "Invitations out",
          description: "RSVP opens with the dietary sweep and the stay-quiet note.",
        },
        {
          meta: "T-3 wks",
          title: "Design on site",
          description: "Florals, tapers, and brass approved in the room, at night, under the real light.",
        },
        {
          meta: "T-2 wks",
          title: "Run-of-show lock",
          description: "Timings rehearsed with the venue and band; toast-givers briefed to three minutes each.",
        },
        {
          meta: "T-3 days",
          title: "Final counts",
          description: "Seating chart, place cards, car manifest, and the kitchen's final numbers.",
        },
        {
          meta: "May 16",
          title: "Show call",
          description: "Install 4:00, sound check 5:30, doors 7:30 — and the room takes it from there.",
        },
      ],
    },
    {
      id: "s_investment",
      type: "investment",
      eyebrow: "Investment",
      title: "The Numbers",
      intro: "Two ways to build the night. Option A is complete as written; Option B is the full supper club — band, buyout, caviar.",
      disclaimer: "Celebrity artist fees, if pursued for the late set, are quoted separately. We commit to keeping the final spend within your approved budget.",
      options: [
        {
          name: "Option A",
          tagline: "The supper club, complete",
          total: { min: 68000, max: 82500 },
          items: [
            { name: "Venue + F&B", price: { min: 26000, max: 30000 } },
            {
              name: "Beverage Program",
              description: "Martini cart, wine service, full bar through last call.",
              price: { min: 7500, max: 10000 },
            },
            {
              name: "Entertainment — Live Trio",
              description: "Standards through supper; the Prince set at ten.",
              price: { min: 7500, max: 8500 },
            },
            { name: "Production (Lights & AV)", price: { min: 6000, max: 7500 } },
            {
              name: "Décor & Florals",
              description: "Burgundy dahlias, taper candles, brass accents.",
              price: { min: 5500, max: 7000 },
            },
            { name: "Rentals", price: { min: 3000, max: 4000 } },
            { name: "Photography", price: { min: 3500, max: 5500 } },
            { name: "Service Charges + Admin Fees + Tax", price: { min: 3500, max: 4500 } },
            {
              name: "Planning Fee",
              badge: "UPGRADE",
              price: { min: 5500 },
              note: "★ You will be charged $5,500",
            },
          ],
        },
        {
          name: "Option B",
          tagline: "The full supper club",
          total: { min: 94000, max: 112000 },
          items: [
            {
              name: "Venue + F&B — Full Buyout",
              badge: "UPGRADE",
              description: "The room is yours alone, front door to back bar.",
              price: { min: 30000, max: 34000 },
            },
            {
              name: "Beverage Program + Caviar Service",
              badge: "UPGRADE",
              price: { min: 9500, max: 11500 },
            },
            {
              name: "Entertainment — Live Band + DJ",
              badge: "UPGRADE",
              description: "Six-piece through the Prince set, DJ from eleven.",
              price: { min: 12500, max: 14500 },
            },
            { name: "Production (Lights & AV)", badge: "UPGRADE", price: { min: 8000, max: 11000 } },
            { name: "Décor & Florals", badge: "UPGRADE", price: { min: 7500, max: 9500 } },
            { name: "Rentals", price: { min: 3500, max: 4500 } },
            {
              name: "Photography + Videography",
              badge: "UPGRADE",
              price: { min: 6000, max: 7500 },
            },
            {
              name: "Late-Night Supper Service",
              badge: "ADD-ON",
              description: "Burgers and champagne at half past midnight.",
              price: { min: 2500, max: 3500 },
            },
            { name: "Service Charges + Admin Fees + Tax", price: { min: 6000, max: 7500 } },
            {
              name: "Planning Fee",
              badge: "UPGRADE",
              price: { min: 8500 },
              note: "★ You will be charged $8,500",
            },
          ],
        },
      ],
      footnote: "Ranges reflect venue selection and final guest count. Totals are the sum of line items shown.",
    },
    {
      id: "s_scope",
      type: "scope",
      eyebrow: "What's Included",
      title: "Planning Scope",
      intro: "Everything below is inside the planning fee — organized by where the work happens.",
      items: [],
      groups: [
        {
          title: "The Plan",
          blurb: "The eight weeks before anyone dresses up.",
          items: [
            "Venue shortlisting, walkthroughs, and contract negotiation",
            "Budget authorship and tracking against the approved cap",
            "One weekly digest — decisions needed, decisions made, nothing scattered",
          ],
        },
        {
          title: "The Room",
          blurb: "Design and the people who bring it.",
          items: [
            "Design development from this proposal through install",
            "Menu development and tasting coordination",
            "Entertainment direction, including the surprise set",
            "Full vendor sourcing, booking, and management",
          ],
        },
        {
          title: "The Night",
          blurb: "May 16, called minute by minute.",
          items: [
            "Run-of-show authorship and night-of calling",
            "Vendor call times, load-in, and strike supervision",
            "Full evening coordination coverage, doors to send-off",
          ],
        },
      ],
    },
    {
      id: "s_closing",
      type: "closing",
      texture: {
        url: "/library/noir/closing--silk-smoke--t1.jpg",
        alt: "Black silk and smoke traced in brass light",
        source: "library",
      },
      title: "Ready to move forward?",
      body: "Pick the option, and we hold May 16. The room, the trio, and the caviar cart do the rest.",
      contactName: "Kira Jia",
      contactEmail: "kira@kirajiaevents.com",
      website: "kirajiaevents.com",
    },
  ],
};
