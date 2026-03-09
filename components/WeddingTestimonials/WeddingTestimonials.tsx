"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './WeddingTestimonials.module.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: d * 0.15 },
  }),
};

const testimonials = [
  {
    quote: "Kira brought structure, calm, and intention to every part of our wedding. She understood exactly how to blend our traditions while keeping the entire day elegant and seamless.",
    name: "JIALIN & JONATHAN",
    detail: "TWA Hotel, JFK",
    chineseName: "嘉琳 & 乔纳森", // Adding mock chinese name for the stamp concept
    featuredImage: { src: '/images/jialin-jonathan-ceremony.jpg', alt: 'Jialin & Jonathan wedding ceremony' },
    detailImage: null as { src: string; alt: string } | null,
    imagePosition: 'left' as const,
  },
  {
    quote: "Set within the historic Mansion at Glen Cove, our wedding brought together timeless romance with meaningful cultural traditions. Kira\u2019s full-service planning from concept development through execution made every detail feel intentional.",
    name: "FELICITY & LEON",
    detail: "The Mansion at Glen Cove, Long Island",
    chineseName: "费莉西蒂 & 里昂",
    featuredImage: { src: '/images/felicity-stairs-couple.jpg', alt: 'Felicity & Leon on the staircase', objectPosition: '100% center' },
    detailImage: { src: '/images/felicity-detail.jpg', alt: 'Felicity & Leon invitation details' },
    imagePosition: 'right' as const,
  }
];

// SVG component for a traditional Chinese stamp/seal look
const ChineseSeal = ({ name }: { name: string }) => (
  <div className={styles.chineseSeal}>
    <svg viewBox="0 0 60 60" className="w-full h-full">
      {/* Irregular slightly distressed border for authentic stamp feel */}
      <path
        d="M5,5 L55,4 L56,54 L6,56 Z"
        fill="none"
        stroke="var(--w-burgundy)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M8,8 L52,7 L53,52 L7,53 Z"
        fill="var(--w-burgundy)"
      />
      <text
        x="30"
        y="30"
        fill="var(--w-bg)"
        fontSize="16"
        fontFamily="serif"
        textAnchor="middle"
        dominantBaseline="middle"
        writingMode="vertical-rl"
        letterSpacing="2"
      >
        {name.substring(0, 4)}
      </text>
    </svg>
  </div>
);

export default function WeddingTestimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    scrollContainerRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section id="wedding-testimonials" className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.preLabel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          KIND WORDS
        </motion.p>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          TESTIMONIALS
        </motion.h2>

        {isMobile ? (
          // Mobile: Centered Carousel
          <div className={styles.mobileCarouselWrapper}>
            <div
              ref={scrollContainerRef}
              className={styles.mobileCarousel}
              onScroll={handleScroll}
            >
              {testimonials.map((t, i) => (
                <div key={i} className={styles.carouselItem}>
                  <div className={styles.photoColMobile}>
                    <div className={styles.photoPrimaryMobile}>
                      <Image
                        src={t.featuredImage.src}
                        alt={t.featuredImage.alt}
                        fill
                        sizes="80vw"
                        style={{
                          objectFit: 'cover',
                          objectPosition: (t.featuredImage as any).objectPosition || 'center'
                        }}
                        loading="lazy"
                      />
                    </div>
                    {/* Chinese Seal Accent */}
                    <div className={styles.sealWrapperMobile}>
                      <ChineseSeal name={t.chineseName} />
                    </div>
                  </div>
                  <div className={styles.textColMobile}>
                    <p className={styles.quoteMobile}>&ldquo;{t.quote}&rdquo;</p>
                    <div className={styles.dividerMobile} />
                    <p className={styles.nameMobile}>{t.name}</p>
                    <p className={styles.detailMobile}>{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className={styles.carouselControls}>
              <button
                onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                className={`${styles.ctrlBtn} ${activeIndex === 0 ? styles.ctrlDisabled : ''}`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} strokeWidth={1} />
              </button>
              <div className={styles.carouselDots}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => scrollTo(Math.min(testimonials.length - 1, activeIndex + 1))}
                className={`${styles.ctrlBtn} ${activeIndex === testimonials.length - 1 ? styles.ctrlDisabled : ''}`}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} strokeWidth={1} />
              </button>
            </div>
          </div>
        ) : (
          // Desktop: Staggered Story List
          <div className={styles.storyList}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className={`${styles.storyCard} ${t.imagePosition === 'right' ? styles.storyCardAlt : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div className={styles.photoCol} custom={0} variants={fadeInUp}>
                  <div className={styles.photoPrimary}>
                    <Image
                      src={t.featuredImage.src}
                      alt={t.featuredImage.alt}
                      fill
                      sizes="45vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: (t.featuredImage as any).objectPosition || 'center'
                      }}
                      loading="lazy"
                    />
                  </div>
                  {t.detailImage && (
                    <div className={styles.photoSecondary}>
                      <Image
                        src={t.detailImage.src}
                        alt={t.detailImage.alt}
                        fill
                        sizes="25vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {/* Chinese Seal Accent */}
                  <motion.div
                    className={styles.sealWrapperDesktop}
                    custom={2}
                    variants={fadeInUp}
                  >
                    <ChineseSeal name={t.chineseName} />
                  </motion.div>
                </motion.div>

                <motion.div className={styles.textCol} custom={1} variants={fadeInUp}>
                  <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                  <div className={styles.divider} />
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.detail}>{t.detail}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
