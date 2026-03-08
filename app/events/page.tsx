"use client";

import Nav from '@/components/Nav/Nav';
import EventsHero from '@/components/EventsHero/EventsHero';
import EventsCapabilities from '@/components/EventsCapabilities/EventsCapabilities';
import PartnerBanner from '@/components/PartnerBanner/PartnerBanner';
import EventsPortfolio from '@/components/EventsPortfolio/EventsPortfolio';
import EventsProcess from '@/components/EventsProcess/EventsProcess';
import EventsContact from '@/components/EventsContact/EventsContact';
import { ScrollEffectsProvider } from '@/components/ScrollEffects/ScrollEffectsProvider';
import { ParticleCanvas } from '@/components/ScrollEffects/ParticleCanvas';
import { ChampagneBurst } from '@/components/ScrollEffects/ChampagneBurst';
import styles from './page.module.css';

export default function EventsPage() {
  return (
    <ScrollEffectsProvider theme="events">
      <ParticleCanvas />
      <Nav mode="events" />
      <ChampagneBurst sectionIds={['events-portfolio', 'events-process', 'events-contact']} />
      <main className={styles.main}>
        <EventsHero />
        <EventsCapabilities />
        <PartnerBanner />
        <EventsPortfolio />
        <EventsProcess />
        <EventsContact />
      </main>
    </ScrollEffectsProvider>
  );
}
