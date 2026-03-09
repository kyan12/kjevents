"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useScrollInSection } from '@/components/ScrollEffects/useScrollInSection';
import styles from './WeddingPhilosophy.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.1 },
  }),
};

export default function WeddingPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollInSection(sectionRef);

  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);
  const wave4Ref = useRef<SVGPathElement>(null);
  const wave5Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    let raf: number;
    const update = () => {
      const p = progress.current;
      // Each wave layer gets a different parallax offset
      if (wave1Ref.current) {
        wave1Ref.current.style.transform = `translateY(${p * -30}px)`;
      }
      if (wave2Ref.current) {
        wave2Ref.current.style.transform = `translateY(${p * -20}px)`;
      }
      if (wave3Ref.current) {
        wave3Ref.current.style.transform = `translateY(${p * -10}px)`;
      }
      if (wave4Ref.current) {
        wave4Ref.current.style.transform = `translateY(${p * 10}px)`;
      }
      if (wave5Ref.current) {
        wave5Ref.current.style.transform = `translateY(${p * 20}px)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className={styles.textCol}>
          <motion.p className={styles.preLabel} custom={0} variants={fadeInUp}>
            ABOUT US
          </motion.p>
          <motion.h2 className={styles.heading} custom={1} variants={fadeInUp}>
            We believe every marriage deserves a day that feels like you.
          </motion.h2>
          <motion.div className={styles.accentBlock} custom={2} variants={fadeInUp}>
            <p>
              Kira is the founder of Kira Jia Events, a boutique planning studio specializing in refined weddings that thoughtfully bridge cultures and traditions. With a bicultural background and deep understanding of both Western and Asian celebrations, Kira approaches each wedding with discernment, structure, and a strong sense of storytelling.
            </p>
          </motion.div>
          <motion.p className={styles.bodyText} custom={3} variants={fadeInUp}>
            Drawing from extensive experience in event planning and large-scale production management, she brings a balance of creativity and logistical precision to every celebration. We take on a limited number of couples each year, by design. Our process is intentional, our attention is total, and the results are unlike anyone else&rsquo;s celebration.
          </motion.p>
          <motion.p className={styles.signature} custom={4} variants={fadeInUp}>
            Kira Jia
          </motion.p>
          <motion.p className={styles.signatureRole} custom={4.5} variants={fadeInUp}>
            FOUNDER & LEAD PLANNER
          </motion.p>
        </div>

        <motion.div className={styles.photoCol} custom={1.5} variants={fadeInUp}>
          {/* Layered flowing wave transition overlay */}
          <div className={styles.waveOverlay}>
            <svg
              viewBox="0 0 200 800"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Wave 1 — faintest, furthest right edge */}
              <path
                ref={wave1Ref}
                className={styles.waveLayer}
                d="M0,0 L80,0 C95,80 60,160 90,240 C110,320 55,400 85,480 C105,560 65,640 80,720 L75,800 L0,800 Z"
                fill="var(--w-bg)"
                opacity="0.15"
              />
              {/* Wave 2 — subtle inner layer */}
              <path
                ref={wave2Ref}
                className={styles.waveLayer}
                d="M0,0 L70,0 C88,90 50,170 78,260 C100,340 48,420 75,500 C95,580 55,660 70,740 L65,800 L0,800 Z"
                fill="var(--w-bg)"
                opacity="0.3"
              />
              {/* Wave 3 — mid-opacity, central wave */}
              <path
                ref={wave3Ref}
                className={styles.waveLayer}
                d="M0,0 L58,0 C78,100 40,185 65,280 C88,360 42,440 62,520 C82,600 45,680 58,760 L55,800 L0,800 Z"
                fill="var(--w-bg)"
                opacity="0.5"
              />
              {/* Wave 4 — strong coverage */}
              <path
                ref={wave4Ref}
                className={styles.waveLayer}
                d="M0,0 L45,0 C65,110 30,200 52,300 C72,380 35,460 50,540 C68,620 38,700 45,770 L42,800 L0,800 Z"
                fill="var(--w-bg)"
                opacity="0.75"
              />
              {/* Wave 5 — fully opaque, blends into text column */}
              <path
                ref={wave5Ref}
                className={styles.waveLayer}
                d="M0,0 L30,0 C48,120 20,220 38,320 C55,400 25,480 38,560 C52,640 28,720 32,780 L28,800 L0,800 Z"
                fill="var(--w-bg)"
                opacity="1.0"
              />
            </svg>
          </div>


          <div className={styles.photoPrimary}>
            <Image
              src="/images/kira_portrait.jpg"
              alt="Kira Jia"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
              priority
            />
            <div className={styles.vignette} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
