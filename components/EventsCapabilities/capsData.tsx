import { ReactNode } from 'react';

export interface CapItem {
  n: string;
  title: string;
  desc: string;
  items: string[];
  icon: ReactNode;
}

export const caps: CapItem[] = [
  {
    n: '01', title: 'Special & Private Events',
    desc: 'Refined gatherings produced with careful attention to atmosphere, entertainment, and guest experience.',
    items: ['Birthday celebrations', 'Corporate celebrations', 'Private receptions & milestone events', 'Curated entertainment programming'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M7 5h10M8 5c0 6 4 8 4 11M16 5c0 6-4 8-4 11M12 16v5M9 21h6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    n: '02', title: 'Cultural, Music Festival & Stage Productions',
    desc: 'Live performance production and cultural programming developed in collaboration with artists, agents, and production teams.',
    items: ['Festival production planning & curation', 'Stage management & coordination', 'Artist booking and talent relations', 'Live performance scheduling'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M6 16v-8 M12 20v-16 M18 14v-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    n: '03', title: 'Corporate Conferences',
    desc: 'Multi-day strategic events from 50 to 5,000 attendees. AV, logistics, speaker management.',
    items: ['Full AV production management', 'Speaker & agenda coordination', 'Multi-day logistics planning', 'Breakout & session management'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M4 18h16 M8 14h8 M12 10v4 M12 4v2 M9 4h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    n: '04', title: 'Product Launches',
    desc: 'The moment your brand makes its next statement. Experiential activations that are unforgettable.',
    items: ['Brand activation strategy', 'Experiential venue design', 'Press & media coordination', 'Launch moment production'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M12 3L15 9L21 12L15 15L12 21L9 15L3 12L9 9Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    n: '05', title: 'Annual Galas & Fundraisers',
    desc: 'Black-tie excellence. Table design to paddle raise, managed with precision and care.',
    items: ['Gala design & full theming', 'Auction & fundraiser management', 'Table curation & seating', 'Entertainment & flow management'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M12 3v18 M7 14c0-4 5-5 5-5 M17 14c0-4-5-5-5-5 M9 18c0-3 3-4 3-4 M15 18c0-3-3-4-3-4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    n: '06', title: 'Executive Retreats',
    desc: 'Intimate, high-stakes off-site gatherings that sharpen teams and honor relationships.',
    items: ['Venue sourcing & negotiation', 'Program & agenda design', 'Travel & accommodation logistics', 'Facilitation support'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="var(--e-gold)" strokeWidth="1.2" fill="none">
        <path d="M4 18L10 8L14 14L20 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
];
