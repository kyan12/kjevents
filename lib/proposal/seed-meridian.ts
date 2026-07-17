import type { TProposal } from "./schema";

/**
 * Styled sample — EDITORIAL. "Meridian Capital · Tenth Anniversary Gala":
 * Swiss-modern corporate gala, monochrome plus one vermillion accent.
 * Demonstrates the editorial theme (Geist display), architectural venues,
 * and a corporate two-option investment with a broadcast-tier upgrade.
 */
export const meridianProposal: TProposal = {
  id: "seed-meridian-gala",
  slug: "meridian-gala-demo",
  status: "draft",
  createdAt: "2026-07-16T12:00:00.000Z",
  updatedAt: "2026-07-16T12:00:00.000Z",
  client: { name: "Meridian Capital" },
  event: {
    title: "The Tenth Anniversary Gala",
    type: "corporate",
    date: "Thursday, February 26, 2027",
    time: "6:30 PM — 12:00 AM",
    location: "Manhattan, NYC",
    guests: "180–220 Guests",
  },
  confidential: true,
  theme: { style: "editorial" },
  sections: [
    {
      id: "s_cover",
      type: "cover",
      eyebrow: "Event Proposal · Prepared by Kira Jia Events",
      facts: [
        { label: "Date", value: "Thursday, February 26, 2027" },
        { label: "Time", value: "6:30 PM — 12:00 AM" },
        { label: "Location", value: "Manhattan, NYC" },
        { label: "Guest Count", value: "180–220 Guests" },
      ],
      background: {
        url: "/library/editorial/cover--concrete-hall--t1.jpg",
        alt: "Monochrome concrete hall, raking light, one distant vermillion installation",
        source: "library",
      },
    },
    {
      id: "s_vision",
      type: "vision",
      eyebrow: "The Vision",
      title: "Ten Years, One Color",
      body: "A gala with the discipline of an annual report and none of its temperature. The room is monochrome — white, concrete, near black — and exactly one thing in it is red: a single vermillion installation that carries the brand without a logo wall in sight. Dinner runs on a precise grid of long black tables; the program is tight, produced, and over by ten so the floor can open.\n\nRestraint is the luxury. No drape, no uplighting rainbow, no centerpiece arms race — architecture, light, and one perfect accent.",
      facts: [
        { label: "Event Type", value: "Corporate Gala — 10th Anniversary" },
        { label: "Dress Code", value: "Black Tie, Minimal" },
        { label: "Format", value: "Seated dinner → program → after-hours floor" },
      ],
      image: {
        url: "/library/editorial/vision--gallery-grid--t1.jpg",
        alt: "The table grid held to monochrome — one vermillion installation carrying the room",
        source: "library",
      },
      quote: {
        text: "Restraint is the luxury. One color, doing all the work.",
        attribution: "Design thesis",
      },
    },
    {
      id: "s_palette",
      type: "palette",
      eyebrow: "Art Direction",
      title: "The Look",
      intro: "Monochrome held absolutely, plus one accent doing all the work.",
      options: [
        {
          name: "Signal Red on Concrete",
          badge: "Option 01 — Recommended",
          description: "Gallery white and poured concrete, near-black tablescapes, matte paper goods — and a single vermillion floral installation at the room's center of gravity. Every photograph composes itself around it.",
          colors: [
            { name: "Gallery White", hex: "#f6f6f2" },
            { name: "Near Black", hex: "#111111" },
            { name: "Concrete", hex: "#7a7a72" },
            { name: "Vermillion", hex: "#de3919" },
            { name: "Paper", hex: "#e8e8e0" },
          ],
          hero: {
            url: "/library/editorial/hero--concrete-gala--t1.jpg",
            alt: "Concrete gala hall with black table grid and a single vermillion floral installation",
            source: "library",
          },
          gallery: [
            {
              url: "/library/editorial/tile--anthurium--t1.jpg",
              alt: "Single vermillion anthurium in a black vase on a concrete plinth",
              source: "library",
            },
            {
              url: "/library/editorial/tile--black-place-setting--t1.jpg",
              alt: "Matte black place setting on white oak in hard directional light",
              source: "library",
            },
            {
              url: "/library/editorial/tile--concrete-bar--t1.jpg",
              alt: "Raking light on board-formed concrete over a blackened steel bar",
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
      title: "Shortlisted Spaces",
      intro: "Four rooms with the architecture to carry a monochrome brief. Availability for February 26 is pending on all.",
      items: [
        {
          name: "The Glasshouse",
          area: "660 12th Ave · Hell's Kitchen",
          description: "Full-floor glass box over the Hudson — skyline as the only décor, production infrastructure already in the ceiling.",
          tags: ["Skyline", "Built-in rigging"],
          facts: [
            { label: "Capacity", value: "300 seated · 500 flow" },
            { label: "Rigging", value: "Built-in grid" },
            { label: "Freight", value: "2 bays, level load" },
            { label: "Hire est.", value: "$28,000–32,000" },
          ],
          image: {
            url: "/library/editorial/venue--glass-box--t1.jpg",
            alt: "Atmosphere direction for The Glasshouse — dusk glass box, skyline as the only décor",
            source: "library",
          },
        },
        {
          name: "Spring Studios",
          area: "6 St Johns Ln · Tribeca",
          description: "Fashion-week bones: white volumes, concrete floors, freight access that makes an LED-wall build trivial.",
          tags: ["White box", "Freight access"],
          facts: [
            { label: "Capacity", value: "250 seated · 400 flow" },
            { label: "Rigging", value: "Points + house power" },
            { label: "Freight", value: "Street-level dock" },
            { label: "Hire est.", value: "$26,000–30,000" },
          ],
          image: {
            url: "/library/editorial/venue--white-studio--t1.jpg",
            alt: "Atmosphere direction for Spring Studios — white volumes, concrete floor, monolithic daylight",
            source: "library",
          },
        },
        {
          name: "The Refinery at Domino",
          area: "300 Kent Ave · Williamsburg",
          description: "Brick shell, glass crown, river light — industrial gravity if the brief wants texture over purity.",
          tags: ["Industrial", "River views"],
          facts: [
            { label: "Capacity", value: "220 seated · 350 flow" },
            { label: "Rigging", value: "Ground support req." },
            { label: "Freight", value: "Shared dock, booked" },
            { label: "Hire est.", value: "$26,000–30,000" },
          ],
          image: {
            url: "/library/editorial/venue--brick-shell--t1.jpg",
            alt: "Atmosphere direction for The Refinery at Domino — brick shell under a glass crown",
            source: "library",
          },
        },
        {
          name: "Skylight at Essex Crossing",
          area: "202 Broome St · Lower East Side",
          description: "Raw concrete spans and daylight-to-black control — the most gallery-like room on the list.",
          tags: ["Raw concrete", "Blackout capable"],
          facts: [
            { label: "Capacity", value: "240 seated · 380 flow" },
            { label: "Rigging", value: "Exposed spans, full rig" },
            { label: "Freight", value: "Oversize elevator" },
            { label: "Hire est.", value: "$24,000–28,000" },
          ],
          image: {
            url: "/library/editorial/venue--concrete-spans--t1.jpg",
            alt: "Atmosphere direction for Skylight at Essex Crossing — raw spans, daylight to black",
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
          title: "The Arrival Corridor",
          description: "Guests walk a monochrome corridor with one long vermillion installation grazing the wall — the brand stated once, perfectly, before a word is spoken.",
          image: {
            url: "/library/editorial/moment--red-corridor--t1.jpg",
            alt: "The arrival corridor — vermillion running the length of a concrete wall",
            source: "library",
          },
        },
        {
          title: "Room to Black",
          description: "Four minutes of film, one screen, total darkness — the only branded moment of the night, engineered so the room holds its breath.",
        },
        {
          title: "The Transition",
          description: "Dessert lands as the headline act opens; the shift from program to party is choreographed to the bar.",
        },
        {
          title: "The After-Hours Floor",
          description: "Tables cleared, room dark, the installation alone under red light — the photograph everyone posts.",
          image: {
            url: "/library/editorial/moment--after-hours--t1.jpg",
            alt: "The after-hours floor — the installation alone under red light",
            source: "library",
          },
        },
      ],
    },
    {
      id: "s_ros",
      type: "runOfShow",
      eyebrow: "Run of Show",
      title: "Evening Overview",
      items: [
        { time: "6:30 PM", phase: "Arrival", title: "Arrival corridor", description: "Guests enter along the vermillion installation — coat check, champagne, no queue visible from the room." },
        { time: "7:15 PM", phase: "The Program", title: "Seated dinner", description: "Two courses on the grid, service choreographed to finish before the program starts." },
        { time: "8:20 PM", title: "The anniversary film", description: "Four minutes, room to black, one screen. The only branded moment of the night." },
        { time: "8:30 PM", title: "Founders' toast & awards", description: "Twenty-five minutes, hard-timed, teleprompted, rehearsed that afternoon." },
        { time: "9:00 PM", phase: "The Floor", title: "Dessert & headline set", description: "Dessert lands as the act opens — the transition is the show." },
        { time: "10:00 PM", title: "After-hours floor", description: "Tables cleared from the center grid, DJ, dark room, red light only on the installation." },
        { time: "11:45 PM", title: "Last call", description: "Cars staged on the freight side; the room empties in fifteen minutes flat." },
      ],
    },
    {
      id: "s_crew",
      type: "custom",
      eyebrow: "Staffing",
      title: "Who Runs the Night",
      body: "Twenty-two crew on comms, one voice calling. Every role below reports into the show caller; your team hosts, we operate.",
      variant: "schedule",
      items: [
        {
          meta: "×1 · Ch. 1",
          title: "Show caller",
          description: "Owns the minute-by-minute from doors to last call — the only voice on channel one.",
        },
        {
          meta: "×2",
          title: "Producer & floor ASM",
          description: "Vendor wrangling, talent escort, and the thousand small decisions that never reach you.",
        },
        {
          meta: "×6",
          title: "AV, lighting & LED ops",
          description: "Room-to-black cue, film playback, program audio — rehearsed at 3:00 PM with the afternoon run.",
        },
        {
          meta: "×4",
          title: "Catering captains",
          description: "One per fifty-five guests; course drops choreographed to the program beats, not the clock.",
        },
        {
          meta: "×5",
          title: "Guest operations",
          description: "Arrival corridor, coat, seating-grid stewards, and car staging on the freight side.",
        },
        {
          meta: "×4",
          title: "Security",
          description: "Perimeter and freight, plus principal coverage for the founders through the program.",
        },
      ],
    },
    {
      id: "s_investment",
      type: "investment",
      eyebrow: "Investment",
      title: "The Numbers",
      intro: "Option A delivers the full brief. Option B adds the broadcast tier — LED wall, live edit, headline act — for a program that travels beyond the room.",
      disclaimer: "Headline-artist fees above the entertainment allowance are quoted separately on shortlist approval. We commit to keeping the final spend within the approved budget.",
      options: [
        {
          name: "Option A",
          tagline: "The brief, complete",
          total: { min: 153000, max: 178000 },
          items: [
            { name: "Venue Hire", price: { min: 28000, max: 32000 } },
            { name: "Catering + Staff", price: { min: 42000, max: 48000 } },
            { name: "Beverage Program", price: { min: 16000, max: 19000 } },
            {
              name: "Production — AV, Lighting & Staging",
              description: "Room-to-black control, single screen, program audio.",
              price: { min: 22000, max: 26000 },
            },
            {
              name: "Décor & The Installation",
              description: "The vermillion centerpiece, table grid, matte paper goods.",
              price: { min: 12000, max: 15000 },
            },
            { name: "Entertainment & Programming", price: { min: 8000, max: 10000 } },
            { name: "Photography + Content", price: { min: 5500, max: 7000 } },
            { name: "Service Charges + Admin Fees + Tax", price: { min: 6500, max: 8000 } },
            {
              name: "Planning Fee",
              badge: "UPGRADE",
              price: { min: 13000 },
              note: "★ You will be charged $13,000",
            },
          ],
        },
        {
          name: "Option B",
          tagline: "The broadcast tier",
          total: { min: 206000, max: 239500 },
          items: [
            { name: "Venue Hire", price: { min: 28000, max: 32000 } },
            { name: "Catering + Staff", badge: "UPGRADE", price: { min: 46000, max: 52000 } },
            { name: "Beverage Program", badge: "UPGRADE", price: { min: 18000, max: 21000 } },
            {
              name: "Production — LED Wall + Broadcast",
              badge: "UPGRADE",
              description: "Full-width LED, multi-cam capture, program directed live.",
              price: { min: 38000, max: 44000 },
            },
            {
              name: "Décor & The Installation",
              badge: "UPGRADE",
              description: "The installation scales to an entry corridor and room centerpiece.",
              price: { min: 18000, max: 22000 },
            },
            {
              name: "Entertainment — Headline Act",
              badge: "UPGRADE",
              price: { min: 16000, max: 20000 },
            },
            {
              name: "Photography + Video + Live Edit",
              badge: "UPGRADE",
              description: "A cut of the night delivered before the last car leaves.",
              price: { min: 9500, max: 12000 },
            },
            {
              name: "After-Hours Lounge",
              badge: "ADD-ON",
              price: { min: 6000, max: 8000 },
            },
            { name: "Service Charges + Admin Fees + Tax", price: { min: 8500, max: 10500 } },
            {
              name: "Planning Fee",
              badge: "UPGRADE",
              price: { min: 18000 },
              note: "★ You will be charged $18,000",
            },
          ],
        },
      ],
      footnote: "Ranges reflect venue selection and final headcount. Totals are the sum of line items shown.",
    },
    {
      id: "s_scope",
      type: "scope",
      eyebrow: "What's Included",
      title: "Production Scope",
      intro: "The planning fee covers strategy, production, and the guest experience — in that order, on one team.",
      items: [],
      groups: [
        {
          title: "Strategy & Design",
          blurb: "The brief, held to.",
          items: [
            "Venue shortlisting, walkthroughs, and contract negotiation",
            "Design development and brand liaison from this proposal through install",
            "Program authorship — film, toasts, awards — with afternoon rehearsal",
            "Budget tracking against the approved cap",
          ],
        },
        {
          title: "Production & Technical",
          blurb: "The machine under the monochrome.",
          items: [
            "Full vendor sourcing, booking, and management",
            "Show-calling and full technical direction on the night",
            "Crew plan, comms, and rehearsal as specified in Staffing",
          ],
        },
        {
          title: "Guests & Wrap",
          blurb: "Before, during, after.",
          items: [
            "Guest logistics: arrivals, seating grid, car staging",
            "Post-event wrap: content delivery and vendor reconciliation",
          ],
        },
      ],
    },
    {
      id: "s_closing",
      type: "closing",
      texture: {
        url: "/library/editorial/closing--concrete-texture--t1.jpg",
        alt: "Board-formed concrete in raking light",
        source: "library",
      },
      title: "Ready to move forward?",
      body: "Confirm the option and the date, and we take the venues to contract this week.",
      contactName: "Kira Jia",
      contactEmail: "kira@kirajiaevents.com",
      website: "kirajiaevents.com",
    },
  ],
};
