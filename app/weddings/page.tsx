"use client";

import Nav from '@/components/Nav/Nav';
import WeddingHero from '@/components/WeddingHero/WeddingHero';
import WeddingPhilosophy from '@/components/WeddingPhilosophy/WeddingPhilosophy';
import WeddingServices from '@/components/WeddingServices/WeddingServices';
import WeddingAvailability from '@/components/WeddingAvailability/WeddingAvailability';
import WeddingPortfolio from '@/components/WeddingPortfolio/WeddingPortfolio';
import WeddingProcess from '@/components/WeddingProcess/WeddingProcess';
import WeddingTestimonials from '@/components/WeddingTestimonials/WeddingTestimonials';
import WeddingContact from '@/components/WeddingContact/WeddingContact';
import { ScrollEffectsProvider } from '@/components/ScrollEffects/ScrollEffectsProvider';
import FallingPetals from '@/components/FallingPetals/FallingPetals';
import styles from './page.module.css';

export default function WeddingsPage() {
  return (
    <ScrollEffectsProvider theme="wedding">
      <Nav mode="wedding" />
      <main className={styles.main}>
        <WeddingHero />
        <WeddingPhilosophy />
        <WeddingServices />
        <WeddingAvailability />
        <WeddingPortfolio />
        <WeddingProcess />
        <WeddingTestimonials />
        <WeddingContact />
        <FallingPetals />
      </main>
    </ScrollEffectsProvider>
  );
}
