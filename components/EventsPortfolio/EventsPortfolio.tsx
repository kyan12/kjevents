"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import styles from './EventsPortfolio.module.css';

const projects = [
  {
    image: '/images/other_hero_1.png',
    title: 'A:Round Events Series',
    city: 'New York City',
    stats: '300+ Guests · Multi-Night Series',
    quote: '\u201CThe most electrifying recurring event series in the city. Every edition raises the bar.\u201D',
    attr: '\u2014 Series Producer',
  },
  {
    image: '/images/other_hero_2.png',
    title: 'Dream Asia Festival',
    city: 'New York City',
    stats: 'Multi-Day · Large-Scale Outdoor',
    quote: '\u201CA celebration of culture, food, and art — produced at a scale that honored every detail.\u201D',
    attr: '\u2014 Festival Director',
  },
  {
    image: '/images/other_hero_1.png',
    title: 'Rico Rico Fiesta',
    city: 'New York City',
    stats: 'Full Sensory Production',
    quote: '\u201CVibrant, bold, unforgettable. The energy was unlike anything we\u2019ve experienced.\u201D',
    attr: '\u2014 Event Host',
  },
  {
    image: '/images/other_hero_2.png',
    title: "Bella\u2019s Wild One",
    city: 'New York City',
    stats: 'Milestone Celebration',
    quote: '\u201CIntimate yet grand. Every detail was designed with whimsy and elegance.\u201D',
    attr: '\u2014 Client Family',
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.12 },
  }),
};

export default function EventsPortfolio() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="events-portfolio" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
          OUR WORK
        </motion.p>
        <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
          SELECTED PROJECTS
        </motion.h2>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeInUp}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
            >
              <Card className={cn(
                'bg-e-bg border-e-border rounded-none overflow-hidden py-0',
                'ring-0 ring-transparent',
                'transition-all duration-350 ease-out',
                hov === i && 'border-e-gold -translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.3)]'
              )}>
                <div className="relative h-[210px] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={cn(
                      'object-cover transition-transform duration-700 ease-out',
                      hov === i && 'scale-105'
                    )}
                  />
                </div>
                <CardContent className="border-t-2 border-e-gold px-[30px] py-[30px]">
                  <p className={styles.cardTitle}>{p.title}</p>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-e-gold/15 text-e-gold border-e-gold/30 rounded-none text-[10px] tracking-[0.1em] font-normal h-auto px-2 py-0.5 hover:bg-e-gold/25">
                      {p.city}
                    </Badge>
                    <Badge className="bg-transparent text-e-muted border-e-border rounded-none text-[10px] tracking-[0.05em] font-normal h-auto px-2 py-0.5 hover:bg-e-bg-mid">
                      {p.stats}
                    </Badge>
                  </div>
                  <p className={styles.cardQuote}>{p.quote}</p>
                  <p className={styles.cardAttr}>{p.attr}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
