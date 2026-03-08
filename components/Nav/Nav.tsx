"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

interface NavProps {
  mode: "wedding" | "events";
}

const anchors: Record<string, { label: string; wedding: string; events: string }[]> = {
  links: [
    { label: 'SERVICES', wedding: 'wedding-services', events: 'events-capabilities' },
    { label: 'PORTFOLIO', wedding: 'wedding-portfolio', events: 'events-portfolio' },
    { label: 'PROCESS', wedding: 'wedding-process', events: 'events-process' },
  ],
};

export default function Nav({ mode }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = anchors.links.map(a => mode === 'wedding' ? a.wedding : a.events);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }
    return () => observerRef.current?.disconnect();
  }, [mode]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const contactId = mode === 'wedding' ? 'wedding-contact' : 'events-contact';
  const ctaLabel = 'INQUIRE';
  const crossLink = mode === 'wedding' ? '/events' : '/weddings';
  const crossLabel = mode === 'wedding' ? 'EVENTS' : 'WEDDINGS';

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${styles[mode]}`}>
      <button className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        KIRA JIA EVENTS
      </button>
      <div className={styles.right}>
        <div className={styles.anchors}>
          {anchors.links.map((a) => {
            const targetId = mode === 'wedding' ? a.wedding : a.events;
            return (
              <button
                key={a.label}
                className={`${styles.anchor} ${activeId === targetId ? styles.anchorActive : ''}`}
                onClick={() => scrollTo(targetId)}
              >
                {a.label}
              </button>
            );
          })}
        </div>
        <div className={styles.divider} />
        <Link href={crossLink} className={styles.crossLink}>
          {crossLabel}
        </Link>
        <button className={styles.cta} onClick={() => scrollTo(contactId)}>
          {ctaLabel} &rarr;
        </button>
      </div>
    </nav>
  );
}
