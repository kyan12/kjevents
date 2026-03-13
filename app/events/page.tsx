"use client";

import Nav from '@/components/Nav/Nav';
import EventsHero from '@/components/EventsHero/EventsHero';
import EventsCapabilities from '@/components/EventsCapabilities/EventsCapabilities';
import EventsStats from '@/components/EventsStats/EventsStats';
import EventsPortfolio from '@/components/EventsPortfolio/EventsPortfolio';
import EventsTestimonials from '@/components/EventsTestimonials/EventsTestimonials';
import EventsProcess from '@/components/EventsProcess/EventsProcess';
import EventsContact from '@/components/EventsContact/EventsContact';
import { ScrollEffectsProvider } from '@/components/ScrollEffects/ScrollEffectsProvider';
import styles from './page.module.css';

export default function EventsPage() {
  return (
    <ScrollEffectsProvider theme="events">
      <Nav mode="events" />
      <main className={styles.main}>
        <EventsHero />
        <EventsCapabilities />
        <EventsStats />
        <EventsPortfolio />
        <EventsProcess />
        <EventsTestimonials />
        <EventsContact />
      </main>
    </ScrollEffectsProvider>
  );
}
