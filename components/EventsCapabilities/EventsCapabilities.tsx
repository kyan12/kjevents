"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import styles from './EventsCapabilities.module.css';

const caps = [
  {
    n: '01', title: 'Special & Private Events',
    desc: 'Refined gatherings produced with careful attention to atmosphere, entertainment, and guest experience.',
    items: ['Birthday celebrations', 'Corporate celebrations', 'Private receptions & milestone events', 'Curated entertainment programming'],
  },
  {
    n: '02', title: 'Cultural, Music Festival & Stage Productions',
    desc: 'Live performance production and cultural programming developed in collaboration with artists, agents, and production teams.',
    items: ['Festival production planning & curation', 'Stage management & coordination', 'Artist booking and talent relations', 'Live performance scheduling'],
  },
  {
    n: '03', title: 'Corporate Conferences',
    desc: 'Multi-day strategic events from 50 to 5,000 attendees. AV, logistics, speaker management.',
    items: ['Full AV production management', 'Speaker & agenda coordination', 'Multi-day logistics planning', 'Breakout & session management'],
  },
  {
    n: '04', title: 'Product Launches',
    desc: 'The moment your brand makes its next statement. Experiential activations that are unforgettable.',
    items: ['Brand activation strategy', 'Experiential venue design', 'Press & media coordination', 'Launch moment production'],
  },
  {
    n: '05', title: 'Annual Galas & Fundraisers',
    desc: 'Black-tie excellence. Table design to paddle raise, managed with precision and care.',
    items: ['Gala design & full theming', 'Auction & fundraiser management', 'Table curation & seating', 'Entertainment & flow management'],
  },
  {
    n: '06', title: 'Executive Retreats',
    desc: 'Intimate, high-stakes off-site gatherings that sharpen teams and honor relationships.',
    items: ['Venue sourcing & negotiation', 'Program & agenda design', 'Travel & accommodation logistics', 'Facilitation support'],
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.09 },
  }),
};

export default function EventsCapabilities() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="events-capabilities" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          WHAT WE DO
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          CAPABILITIES
        </motion.h2>
        <div className={styles.grid}>
          {caps.map((c, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeInUp}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
            >
              <Card className={cn(
                'bg-e-bg border-e-border rounded-none h-full py-0',
                'ring-0 ring-transparent',
                'transition-all duration-300',
                hov === i && 'bg-[#444840] border-e-gold shadow-[0_8px_24px_rgba(0,0,0,0.2)]'
              )}>
                <CardHeader className="px-[30px] pt-[36px] pb-0">
                  <span className={cn(
                    'font-[var(--font-bebas)] text-[48px] text-e-gold leading-none mb-1',
                    'transition-opacity duration-300',
                    hov === i ? 'opacity-65' : 'opacity-22',
                    styles.ghostNum
                  )}>
                    {c.n}
                  </span>
                  <Separator className="bg-e-gold/28 mb-[18px]" />
                </CardHeader>
                <CardContent className="px-[30px] pb-[32px]">
                  <p className={styles.cardTitle}>{c.title}</p>
                  <p className={styles.cardDesc}>{c.desc}</p>
                  {c.items.map((item, j) => (
                    <div key={j} className={styles.item}>
                      <span className={styles.itemDash}>&mdash;</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
