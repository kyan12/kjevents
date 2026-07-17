import { type TProposal } from "./schema";

/**
 * Canonical fixture: full transcription of the real reference proposal
 * "Edwin Tang — Event Proposal — Kira Jia Events" (reference/*.pdf).
 * Used as the renderer's fidelity benchmark and as demo/seed content.
 */
export const edwinTangProposal: TProposal = {
  id: "seed-edwin-tang",
  slug: "edwin-tang-demo",
  status: "sent",
  createdAt: "2026-05-01T12:00:00.000Z",
  updatedAt: "2026-05-01T12:00:00.000Z",
  client: { name: "Edwin Tang" },
  event: {
    title: "Graduation & Going Away Party",
    type: "graduation",
    date: "Saturday, May 16, 2026",
    time: "7:30 PM — 12:00 AM",
    location: "Manhattan, New York",
    guests: "60–80 Guests",
  },
  confidential: true,
  sections: [
    {
      id: "s_cover",
      type: "cover",
      eyebrow: "Event Proposal · Prepared by Kira Jia Events",
      facts: [
        { label: "Date", value: "Saturday, May 16, 2026" },
        { label: "Time", value: "7:30 PM — 12:00 AM" },
        { label: "Location", value: "Manhattan, New York" },
        { label: "Guest Count", value: "60–80 Guests" },
      ],
    },
    {
      id: "s_vision",
      type: "vision",
      eyebrow: "The Vision",
      title: "The Send-Off",
      body: "A graduation and farewell event for 60–80 guests in Manhattan. Edwin is closing his chapter in New York — this event marks that transition with a fully programmed evening: the right venue, strong production, a curated entertainment lineup, and a program that moves from start to finish. The objective is a well-run, high-energy night that speaks for itself.",
      facts: [
        { label: "Event Type", value: "Graduation Party" },
        { label: "Dress Code", value: "Cocktail Attire" },
        { label: "Format", value: "Semi-Outdoor / Indoor" },
      ],
    },
    {
      id: "s_palette",
      type: "palette",
      options: [
        {
          name: "Blue Hour",
          badge: "Option 01 — Recommended",
          description:
            "Named for the 20-minute window after sunset when the sky turns cinematic — cool blue light, everything sharp and electric. Columbia blue drives the visual language: uplighting, icy white linens, soft silver accents, and a signature Columbia blue cocktail as the throughline. Clean, sophisticated, unmistakably intentional.",
          colors: [
            { name: "Columbia Blue", hex: "#B9D9EB" },
            { name: "Sky Glow", hex: "#8ECFF5" },
            { name: "Ice White", hex: "#F8FBFF" },
            { name: "Deep Navy", hex: "#213D63" },
            { name: "Champagne Tint", hex: "#F3E9DC" },
          ],
          hero: {
            url: "/proposals/edwin-tang/blue-hour-hero.png",
            alt: "Manhattan skyline at blue hour",
            source: "upload",
            hasBakedText: true,
          },
          board: {
            url: "/proposals/edwin-tang/blue-hour-board.png",
            alt: "Blue Hour mood board — Columbia blue linens, cake, tablescape and stationery",
            source: "upload",
          },
          gallery: [],
        },
        {
          name: "May, New York",
          badge: "Option 02 — Recommended",
          description:
            "Warm, lush, grounded. This concept is about the city at its best — a rooftop in full bloom, rich greens from sage to deep forest, antique gold accents, natural textures, warm light. An evening that feels effortlessly elevated without trying too hard. The kind of night New York does better than anywhere else.",
          colors: [
            { name: "Sage Green", hex: "#9AA66B" },
            { name: "Forest Green", hex: "#4A6B1E" },
            { name: "Hunter Green", hex: "#2D4A28" },
            { name: "Warm Sand", hex: "#C4B9A3" },
          ],
          hero: {
            url: "/proposals/edwin-tang/may-ny-hero.png",
            alt: "Rooftop terrace at golden hour with greenery and candlelight",
            source: "upload",
            hasBakedText: true,
          },
          board: {
            url: "/proposals/edwin-tang/may-ny-board.png",
            alt: "May, New York mood board — greens, candlelight, rooftop tables and stationery",
            source: "upload",
          },
          gallery: [],
        },
      ],
    },
    {
      id: "s_venues",
      type: "venues",
      eyebrow: "Venue",
      title: "Shortlisted Spaces",
      intro:
        "All venues semi-outdoor/indoor with Manhattan views. Availability pending confirmation for May 16.",
      items: [
        {
          name: "Le Jardin sur Madison",
          area: "One Madison Ave · Flatiron",
          description:
            "Rooftop garden terrace by the Daniel Boulud group. Exceptional views and a culinary program that matches the caliber of this event.",
          tags: ["Rooftop", "Views", "Culinary"],
        },
        {
          name: "The Standard High Line",
          area: "848 Washington St · Meatpacking",
          description:
            "Le Bain or The Top of The Standard — two distinct spaces in the same iconic building. Hudson River views, strong F&B program.",
          tags: ["Rooftop", "Hudson Views", "Nightlife"],
        },
        {
          name: "The Crown at 50 Bowery",
          area: "50 Bowery · Downtown",
          description:
            "21st floor with Manhattan skyline views, two outdoor terraces + indoor lounge. 5,000 sq ft, proven private event track record.",
          tags: ["Indoor/Outdoor", "Skyline", "5,000 sq ft"],
        },
        {
          name: "Somewhere Nowhere NYC",
          area: "Midtown · Pool Rooftop",
          description:
            "Two-floor venue with an outdoor rooftop pool lounge and a dedicated indoor dance floor. Strong nightlife pedigree with the infrastructure for a fully produced private event.",
          tags: ["Rooftop Pool", "Dance Floor", "Indoor/Outdoor"],
        },
        {
          name: "Elsie Rooftop",
          area: "1412 Broadway, 25th Floor · Bryant Park",
          description:
            "25th floor rooftop with Bryant Park views, an in-house DJ setup, and a full food station program. Purpose-built for private events at this scale.",
          tags: ["Rooftop", "Bryant Park", "In-house DJ"],
        },
      ],
    },
    {
      id: "s_moments",
      type: "moments",
      eyebrow: "Signature Moments",
      title: "The Night's Highlights",
      items: [
        {
          title: "Signature Cocktail Program",
          description:
            "Custom cocktail program built around Edwin's taste. Named, printed on menu cards. The first thing guests hold.",
        },
        {
          title: "Curated Passed Hors d'Oeuvres & Late Night Food Stations",
          description:
            "Passed bites throughout the evening with a full late-night spread activated at 11 PM in the back of the venue.",
        },
        {
          title: "Headliner Takeover",
          description:
            "Room goes dark. Three seconds of silence. Then everything lights up. Headliner drives the room from 10 PM through close.",
        },
        {
          title: "Interactive Polaroid Station & Photo Wall",
          description:
            "Guests shoot and place Polaroids on a curated photo wall. A living record of the night built in real time.",
        },
        {
          title: "Full Production & Lighting Design",
          description:
            "Gobo lighting, confetti drop, full AV and sound design — every sensory detail intentional from arrival to close.",
        },
        {
          title: "Custom Celebration Cake",
          description:
            "A personalized multi-tier cake designed to match the theme. Revealed mid-evening — a natural photo moment and a send-off in sugar.",
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
          title: "Guest Arrival & Welcome",
          description:
            "Columbia blue cocktail on arrival. Food stations open. Ambient music. High-top tables throughout — this is a cocktail-style event, not a seated dinner. Lounge seating scattered around the perimeter for guests to settle between sets.",
        },
        {
          time: "8:00 PM",
          title: "DJ Set Begins",
          description:
            "Opening DJ full set. Energy builds through the room. Passed hors d'oeuvres circulating. Take pics, mingle, and sign the guestbook.",
        },
        {
          time: "9:45 PM",
          title: "Live Performer Set",
          description:
            "Featured live performer takes the stage. Crowd moment before the headliner. Wraps at 10 PM and announces late night bites coming at 11.",
        },
        {
          time: "10:00 PM",
          title: "Headliner Takes Over",
          description:
            "Room goes dark. Three seconds of silence. Then everything lights up as the headliner opens. Full dance floor. Confetti drop timed to peak moment.",
        },
        {
          time: "11:00 PM",
          title: "Late Night Bites",
          description:
            "Food stations hit the back of the venue. Guests fuel up. Headliner drives through until 11:30.",
        },
        {
          time: "11:30 PM",
          title: "Wind Down",
          description:
            "Headliner transitions to house music. Energy softens. Room finds its closing groove.",
        },
        {
          time: "12:00 AM",
          title: "Event Closes",
          description: "Event ends on time. Kira oversees guest departure and vendor wrap-up.",
        },
      ],
    },
    {
      id: "s_investment",
      type: "investment",
      eyebrow: "Investment",
      title: "Two Options",
      intro:
        "Celebrity artist fees, if applicable, are a separate line item not included in either option below.",
      disclaimer:
        "These figures are estimates based on current market research and vendor relationships. Our commitment is to keep the final spend within the agreed budget — we will not exceed it without your approval.",
      options: [
        {
          name: "Option A",
          total: { min: 79000, max: 94500 },
          items: [
            {
              name: "Venue + F&B Minimum + Service Structure",
              description:
                "Semi-outdoor / indoor venue with views, Manhattan. Includes space rental, F&B minimum, service structure.",
              price: { min: 28000, max: 30500 },
            },
            {
              name: "Beverage Program",
              description:
                "Full open bar, custom cocktail program including Columbia blue signature cocktail.",
              price: { min: 16000, max: 19000 },
            },
            {
              name: "Entertainment",
              description: "2 local DJs + 1 live performer.",
              price: { min: 3000 },
            },
            {
              name: "Production (Lights & AV)",
              description: "Full lighting design, AV & sound, upgraded setup.",
              price: { min: 6500, max: 8500 },
            },
            {
              name: "Décor & Florals",
              description: "Floral installation, custom design, theme palette throughout.",
              price: { min: 5500, max: 7500 },
            },
            {
              name: "Rentals",
              description: "Furniture, linens, tabletop, and event rentals.",
              price: { min: 2000, max: 3000 },
            },
            {
              name: "Photography + Videography",
              description: "Event photographer + videographer, edited delivery.",
              price: { min: 3000, max: 4000 },
            },
            {
              name: "Custom Cake",
              description: "Personalized multi-tier cake, theme-matched design and flavors.",
              price: { min: 500, max: 1000 },
            },
            {
              name: "Service Charges + Admin Fees + Tax",
              description: "Venue service charges, admin fees, and applicable taxes.",
              price: { min: 4000, max: 5000 },
            },
            {
              name: "Extras & Miscellaneous",
              description: "Cocktail toppers, Polaroid station, guest book, contingency.",
              price: { min: 1500, max: 2000 },
            },
            {
              name: "Planning Fee (10%)",
              description: "Full-service planning, coordination & day-of management.",
              price: { min: 9000, max: 11000 },
              badge: "UPGRADE",
              note: "★ You will be charged $9,000",
            },
          ],
        },
        {
          name: "Option B",
          total: { min: 125100, max: 148300 },
          items: [
            {
              name: "Venue + F&B Minimum + Service Structure",
              description:
                "Premium semi-outdoor / indoor venue with views, Manhattan. Full buyout, elevated F&B minimum, premium service structure.",
              price: { min: 43000, max: 46500 },
              badge: "UPGRADE",
            },
            {
              name: "Beverage Program",
              description:
                "Premium full open bar, custom cocktail program, Champagne Tower, Wine Tier Upgrade.",
              price: { min: 26000, max: 29500 },
              badge: "UPGRADE",
            },
            {
              name: "Entertainment — Festival-Caliber Artists",
              description: "2 DJs + 1 live performer. Headliner takes over at 10 PM.",
              price: { min: 4500, max: 6000 },
              badge: "UPGRADE",
            },
            {
              name: "Production",
              description:
                "Full lighting design, AV & sound, upgraded setup. Full blackout + spotlight drop timed to headliner's 10 PM entrance.",
              price: { min: 11000, max: 14500 },
              badge: "UPGRADE",
            },
            {
              name: "Décor & Florals",
              description:
                "Full floral installation, custom design, theme palette throughout. Statement photo wall installation as venue centrepiece.",
              price: { min: 11000, max: 13500 },
              badge: "UPGRADE",
            },
            {
              name: "Rentals",
              description: "Premium furniture, linens, tabletop, and event rentals.",
              price: { min: 3000, max: 4000 },
              badge: "UPGRADE",
            },
            {
              name: "Special Effects",
              description: "Confetti drop, fog, and additional production effects.",
              price: { min: 500, max: 1500 },
              badge: "ADD-ON",
            },
            {
              name: "Photography + Videography",
              description: "Event photographer + videographer, edited delivery.",
              price: { min: 4000, max: 6000 },
              badge: "UPGRADE",
            },
            {
              name: "Live Painter",
              description:
                "Artist paints a canvas live throughout the evening capturing the energy of the night. Edwin takes the finished piece home.",
              price: { min: 800, max: 1000 },
              badge: "ADD-ON",
            },
            {
              name: "Extras & Miscellaneous",
              description:
                "Premium cocktail toppers, Polaroid station, guest book, signage, stationery, contingency.",
              price: { min: 2000, max: 2500 },
              badge: "UPGRADE",
            },
            {
              name: "Custom Cake",
              description: "Personalized multi-tier cake, theme-matched design and flavors.",
              price: { min: 800, max: 1000 },
              badge: "UPGRADE",
            },
            {
              name: "Party Favors",
              description:
                "Custom Monkey 47 miniature nip bottles with personalised wrap labels.",
              price: { min: 500, max: 800 },
              badge: "ADD-ON",
            },
            {
              name: "Service Charges + Admin Fees + Tax",
              description: "Venue service charges, admin fees, and applicable taxes.",
              price: { min: 5000, max: 6500 },
              badge: "UPGRADE",
            },
            {
              name: "Planning Fee (10%)",
              description: "Full-service planning, coordination & day-of management.",
              price: { min: 13000, max: 15000 },
              badge: "UPGRADE",
              note: "★ You will be charged $13,000",
            },
          ],
        },
      ],
    },
    {
      id: "s_scope",
      type: "scope",
      eyebrow: "What's Included",
      title: "Planning Scope",
      items: [
        "Venue sourcing, site visits & contract negotiation",
        "Full vendor sourcing, management & coordination",
        "Event concept, theme & aesthetic direction",
        "Budget tracking & management throughout",
        "Run-of-show & timeline development",
        "Weekly check-in meetings with client",
        "Day-of coordination from setup to close",
        "On-site management throughout the evening",
      ],
    },
    {
      id: "s_closing",
      type: "closing",
      title: "Ready to move forward?",
      body: "Review, confirm your option, and sign the agreement to secure the date.",
      contactName: "Kira Jia",
      contactEmail: "kira@kirajiaevents.com",
      website: "kirajiaevents.com",
    },
  ],
};
