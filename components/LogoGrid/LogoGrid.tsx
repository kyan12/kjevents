"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './LogoGrid.module.css';

const logos = [
  { src: '/images/partner-logos/1151773204417_.pic.jpg', alt: 'Henry Lu', scale: 1.8 },
  { src: '/images/partner-logos/BRIDGYIA CULTURAL CENTER_LOGO TRANSPARENT FINAL.png', alt: 'Bridgyia Cultural Center', scale: 1.0 },
  { src: '/images/partner-logos/den+social+futuristic+stacked.webp', alt: 'Den Social', scale: 1.1, skipInvert: true },
  { src: '/images/partner-logos/lei_jiang__2.png', alt: 'Lei Jiang', scale: 1.1, skipInvert: true },
  { src: '/images/partner-logos/Logo - With Text.png', alt: 'Parasol Tree Holdings', scale: 1.5 },
  { src: '/images/partner-logos/unnamed.png', alt: 'Tristar Production Group', scale: 1.3 },
  { src: '/images/partner-logos/logo-aloft-hotels.svg', alt: 'Aloft Hotels', scale: 1.0 },
  { src: '/images/partner-logos/WechatIMG66.jpg', alt: 'Paris.Clicks', scale: 1.0 },
  { src: '/images/partner-logos/Yijun_Zhou__With_Flowers_by_JJ_white_logo-18.png', alt: 'With Flowers by JJ', scale: 1.8, skipInvert: true },
  { src: '/images/partner-logos/chillfit-dark.svg', alt: 'ChillFit', scale: 1.1 },
];

const SLOT_COUNT = 6;
const FLIP_INTERVAL = 2500;

const INITIAL_SLOTS = logos.slice(0, SLOT_COUNT).map((l) => l.src);

function getRandomNewLogo(allSlots: string[]): string | null {
  const usedSrcs = new Set(allSlots);
  const candidates = logos.filter((l) => !usedSrcs.has(l.src));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)].src;
}

export default function LogoGrid() {
  const [slots, setSlots] = useState<string[]>(INITIAL_SLOTS);
  const [flipKey, setFlipKey] = useState<number[]>(() => Array(SLOT_COUNT).fill(0));
  const [isMobile, setIsMobile] = useState(false);
  const mountedRef = useRef(false);
  const lastFlippedRef = useRef<number>(-1);

  useEffect(() => {
    mountedRef.current = true;
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => {
      mountedRef.current = false;
      mql.removeEventListener('change', onChange);
    };
  }, []);

  const triggerFlip = useCallback(() => {
    if (!mountedRef.current) return;
    let slotIdx = Math.floor(Math.random() * SLOT_COUNT);
    if (slotIdx === lastFlippedRef.current && SLOT_COUNT > 1) {
      slotIdx = (slotIdx + 1) % SLOT_COUNT;
    }
    lastFlippedRef.current = slotIdx;

    setSlots((prev) => {
      const newLogo = getRandomNewLogo(prev);
      if (!newLogo) return prev;
      const next = [...prev];
      next[slotIdx] = newLogo;
      return next;
    });
    setFlipKey((prev) => {
      const next = [...prev];
      next[slotIdx] = prev[slotIdx] + 1;
      return next;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(triggerFlip, FLIP_INTERVAL);
    return () => clearInterval(id);
  }, [triggerFlip]);

  const visibleSlots = isMobile ? 4 : SLOT_COUNT;
  const logoForSrc = (src: string) => logos.find((l) => l.src === src);
  const altForSrc = (src: string) => logoForSrc(src)?.alt || 'Partner';
  const scaleForSrc = (src: string) => logoForSrc(src)?.scale || 1;
  const skipInvertForSrc = (src: string) => (logoForSrc(src) as { skipInvert?: boolean })?.skipInvert || false;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.preLabel}>OUR TRUSTED</p>
        <h2 className={styles.sectionHeading}>VENDORS & PARTNERS</h2>
        <div className={styles.grid}>
          {slots.slice(0, visibleSlots).map((src, i) => (
            <div key={i} className={styles.slot}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${i}-${flipKey[i]}`}
                  className={styles.logoWrap}
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={src}
                    alt={altForSrc(src)}
                    width={200}
                    height={200}
                    className={`${styles.logo} ${skipInvertForSrc(src) ? styles.logoNoInvert : ''}`}
                    style={{ transform: `scale(${scaleForSrc(src)})` }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
