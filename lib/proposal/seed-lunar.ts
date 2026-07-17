import type { TProposal } from "./schema";

/**
 * Styled sample — FESTIVAL. "Lunar New Year Night Market & Stage": a
 * cultural production for a neighborhood partnership — vendor village,
 * stage programming, lion dance procession. Demonstrates the festival
 * theme, a custom "Production Divisions" section, artist relations via
 * Jia Creative, and a single production-budget investment.
 */
export const lunarProposal: TProposal = {
  id: "seed-lunar-market",
  slug: "lunar-night-market-demo",
  status: "draft",
  createdAt: "2026-07-16T12:00:00.000Z",
  updatedAt: "2026-07-16T12:00:00.000Z",
  client: { name: "Mott Street Partnership" },
  event: {
    title: "Lunar New Year Night Market & Stage",
    type: "cultural",
    date: "Saturday, February 20, 2027",
    time: "2:00 PM — 10:00 PM",
    location: "Chinatown, Manhattan",
    guests: "2,500+ Attendees",
  },
  confidential: true,
  theme: { style: "festival" },
  sections: [
    {
      id: "s_cover",
      type: "cover",
      eyebrow: "Production Proposal · Prepared by Kira Jia Events",
      facts: [
        { label: "Date", value: "Saturday, February 20, 2027" },
        { label: "Time", value: "2:00 PM — 10:00 PM" },
        { label: "Location", value: "Chinatown, Manhattan" },
        { label: "Attendance", value: "2,500+ Attendees" },
      ],
      background: {
        url: "/library/festival/cover--lantern-canopy--t1.jpg",
        alt: "Two blocks under a canopy of glowing red lanterns at blue hour",
        source: "library",
      },
    },
    {
      id: "s_vision",
      type: "vision",
      eyebrow: "The Vision",
      title: "The Street, Lit",
      body: "Two blocks of Mott Street closed to cars and given back to the neighborhood: a lantern gate at each end, a vendor village of local kitchens and makers down the middle, and a proper stage anchoring the north block. The afternoon belongs to families — lion dance, crafts, the market at full char-siu steam. As the light drops, the lanterns take over and the stage turns to headline programming.\n\nThis is a production, not a block party: real staging, real sound, real crowd operations — wrapped in cinnabar silk and gold paper so it feels like the holiday, not the permit.",
      facts: [
        { label: "Event Type", value: "Cultural Festival — Street Production" },
        { label: "Footprint", value: "Two blocks · vendor village · main stage" },
        { label: "Programming", value: "Family afternoon → headline evening" },
      ],
      image: {
        url: "/library/festival/vision--market-street--t1.jpg",
        alt: "The night market at full steam — lanterns, silk, and woks down the block",
        source: "library",
      },
      quote: {
        text: "It has to feel like the holiday, not the permit.",
        attribution: "The partnership brief",
      },
    },
    {
      id: "s_palette",
      type: "palette",
      eyebrow: "Art Direction",
      title: "The Look",
      intro: "Cinnabar and gold on warm paper — the holiday's own palette, produced to a standard.",
      options: [
        {
          name: "Cinnabar & Gold",
          badge: "Option 01 — Recommended",
          description: "Hundreds of blank red lanterns strung block to block, gilded paper details on every stall, cinnabar silk on the stage. Saturated and joyful, never theme-party kitsch — every surface is real material: silk, paper, bamboo, lacquer.",
          colors: [
            { name: "Warm Paper", hex: "#fff6ec" },
            { name: "Cinnabar", hex: "#c8321e" },
            { name: "Deep Lacquer", hex: "#7c1a10" },
            { name: "Gold Leaf", hex: "#e9b95c" },
            { name: "Lacquer Ink", hex: "#2b1f1a" },
          ],
          hero: {
            url: "/library/festival/hero--lantern-street--t1.jpg",
            alt: "Street at blue hour strung with glowing blank red lanterns over festival banquet tables",
            source: "library",
          },
          gallery: [
            {
              url: "/library/festival/tile--lanterns--t1.jpg",
              alt: "Cluster of blank red paper lanterns at dusk, one glowing",
              source: "library",
            },
            {
              url: "/library/festival/tile--peony-marigold--t1.jpg",
              alt: "Peonies and marigolds in a lacquered vessel on cinnabar silk with gilded motifs",
              source: "library",
            },
            {
              url: "/library/festival/tile--tea-service--t1.jpg",
              alt: "Gilded deep-red tea service steaming on a black lacquered tray",
              source: "library",
            },
          ],
        },
      ],
    },
    {
      id: "s_divisions",
      type: "custom",
      eyebrow: "How It's Built",
      title: "Production Divisions",
      body: "Four workstreams, one production office. Artist relations and booking are developed through Jia Creative, our talent and live-performance arm.",
      items: [
        {
          title: "Site & Operations",
          description: "Street closure permits, community-board liaison, power, sanitation, security, and medical — the invisible half of the festival.",
        },
        {
          title: "Stage & Talent — via Jia Creative",
          description: "Artist booking, offers, and advancing; stage management and show-calling from soundcheck to close.",
        },
        {
          title: "Vendor Village",
          description: "Curation and onboarding of 30+ local food and craft vendors, stall build-out, lantern canopy, and load-in choreography.",
        },
        {
          title: "Cultural Programming",
          description: "Lion dance troupes, drummers, calligraphy and craft stations — programmed with neighborhood organizations, not around them.",
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
          title: "The Lantern Gate",
          description: "A bamboo-and-lantern arch at each end of the footprint — the threshold photo every attendee takes.",
          image: {
            url: "/library/festival/moment--lantern-gate--t1.jpg",
            alt: "The lantern gate — bamboo and glowing red paper at the threshold",
            source: "library",
          },
        },
        {
          title: "Lion Dance Procession",
          description: "Three troupes, drummers ahead, working the full two blocks and blessing every storefront that wants one.",
          image: {
            url: "/library/festival/moment--lion-dance--t1.jpg",
            alt: "Lion dance mid-leap — cinnabar and gold in motion under lantern light",
            source: "library",
          },
        },
        {
          title: "The Night Market at Steam",
          description: "The hour when the woks, the cold, and the lantern light all peak at once.",
          image: {
            url: "/library/festival/moment--market-wok--t1.jpg",
            alt: "The market at steam — wok flame against the lantern glow",
            source: "library",
          },
        },
        {
          title: "Headline Stage Block",
          description: "The evening's booked set — placed at the moment the whole street can see the stage glow.",
        },
        {
          title: "Lantern Hour",
          description: "House lights out, lantern canopy up full, the street glowing end to end for the last ninety minutes.",
        },
      ],
    },
    {
      id: "s_ros",
      type: "runOfShow",
      eyebrow: "Run of Show",
      title: "Festival Day Overview",
      items: [
        { time: "6:00 AM", phase: "The Build", title: "Street closure & build", description: "Barricades, stage build, stall rig, lantern canopy tensioned by noon." },
        { time: "2:00 PM", phase: "Family Hours", title: "Gates — vendor village opens", description: "Family programming begins: crafts, calligraphy, first drum call." },
        { time: "4:00 PM", title: "Lion dance procession", description: "Full-footprint procession, storefront blessings, second drum call." },
        { time: "5:30 PM", title: "Community stage block", description: "Neighborhood groups, school troupes, cultural performances." },
        { time: "7:00 PM", phase: "The Night", title: "Headline stage block", description: "Booked talent via Jia Creative; street at capacity flow." },
        { time: "8:30 PM", title: "Lantern hour", description: "Canopy at full glow, final vendor push, last stage set." },
        { time: "10:00 PM", phase: "Strike", title: "Close & strike", description: "Soft close, vendor load-out, street reopened by 2:00 AM." },
      ],
    },
    {
      id: "s_permits",
      type: "custom",
      eyebrow: "City Process",
      title: "The Paper Trail, Started Now",
      body: "A two-block closure in February is won or lost in the filings. This is the sequence, with the street activity permit as the long pole — it is why the budget needs a signature this month.",
      variant: "schedule",
      items: [
        {
          meta: "T-30 wks",
          title: "Street activity permit filed",
          description: "SAPO application for the two-block closure — everything else sequences from this date.",
        },
        {
          meta: "T-24 wks",
          title: "Community board",
          description: "Presentation with the neighborhood organizations co-signing the program.",
        },
        {
          meta: "T-20 wks",
          title: "NYPD & FDNY coordination",
          description: "Crowd plan, barricade map, hydrant access, and emergency lanes agreed.",
        },
        {
          meta: "T-16 wks",
          title: "Vendor licensing sweep",
          description: "Health-department permits for 30+ food vendors, run as one batch by our office.",
        },
        {
          meta: "T-12 wks",
          title: "Stage & structure filings",
          description: "Temporary structure permits for the stage and lantern gates, engineer-stamped.",
        },
        {
          meta: "T-8 wks",
          title: "Certificates of insurance",
          description: "City, partnership, and per-vendor COIs collected and filed as one packet.",
        },
        {
          meta: "T-2 wks",
          title: "Agency walk-through",
          description: "All agencies on the street with the signed run-of-show; posting notices go up.",
        },
      ],
    },
    {
      id: "s_investment",
      type: "investment",
      eyebrow: "Investment",
      title: "Production Budget",
      intro: "One integrated budget across all four divisions. Vendor stall fees and sponsorship revenue offset against this gross are modeled separately on request.",
      disclaimer: "Headline-artist fees above the talent allowance are quoted on shortlist approval through Jia Creative. We commit to keeping the final spend within the approved budget.",
      options: [
        {
          name: "The Production",
          tagline: "Two blocks, full day",
          total: { min: 138000, max: 167000 },
          items: [
            {
              name: "Site, Permits & Insurance",
              description: "Street activity permits, community liaison, event insurance.",
              price: { min: 18000, max: 22000 },
            },
            { name: "Staging, Sound & Lighting", price: { min: 32000, max: 38000 } },
            {
              name: "Talent & Artist Booking — via Jia Creative",
              description: "Headline and support sets, offers, advancing, hospitality.",
              price: { min: 24000, max: 30000 },
            },
            {
              name: "Cultural Programming",
              description: "Lion dance troupes, drummers, craft and calligraphy stations.",
              price: { min: 12000, max: 15000 },
            },
            {
              name: "Vendor Village Build",
              description: "Stall structures, lantern canopy, power distribution.",
              price: { min: 16000, max: 20000 },
            },
            { name: "Security, Medical & Crowd Operations", price: { min: 9000, max: 11000 } },
            { name: "Marketing & Content Capture", price: { min: 7000, max: 9000 } },
            { name: "Service Charges + Admin Fees + Tax", price: { min: 6000, max: 8000 } },
            {
              name: "Production Fee",
              badge: "INCLUDED",
              price: { min: 14000 },
              note: "★ You will be charged $14,000",
            },
          ],
        },
      ],
      footnote: "Ranges reflect final stage spec and vendor count. Totals are the sum of line items shown.",
    },
    {
      id: "s_scope",
      type: "scope",
      eyebrow: "What's Included",
      title: "Production Scope",
      intro: "One production office, four divisions — the fee covers all of it, city paperwork included.",
      items: [],
      groups: [
        {
          title: "Production & City",
          blurb: "The invisible half of the festival.",
          items: [
            "Festival production planning and event curation end to end",
            "Permitting, community-board liaison, and city agency coordination",
            "Security, medical, and crowd-flow planning with licensed partners",
            "Budget tracking, vendor reconciliation, and post-event report",
          ],
        },
        {
          title: "Stage & Program",
          blurb: "What the street came for.",
          items: [
            "Artist booking and talent relations through Jia Creative",
            "Live performance programming and scheduling",
            "Stage management and production coordination on the day",
          ],
        },
        {
          title: "Village & Community",
          blurb: "The neighborhood, inside the plan.",
          items: [
            "Vendor village curation, onboarding, and operations",
            "Cultural programming built with neighborhood organizations",
          ],
        },
      ],
    },
    {
      id: "s_closing",
      type: "closing",
      texture: {
        url: "/library/festival/closing--cinnabar-silk--t1.jpg",
        alt: "Cinnabar silk scattered with gold paper",
        source: "library",
      },
      title: "Ready to move forward?",
      body: "Approve the budget and we file for the February street closure this month — the date only holds if the paperwork moves now.",
      contactName: "Kira Jia",
      contactEmail: "kira@kirajiaevents.com",
      website: "kirajiaevents.com",
    },
  ],
};
