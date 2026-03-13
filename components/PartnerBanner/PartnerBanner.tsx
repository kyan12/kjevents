import Image from 'next/image';
import styles from './PartnerBanner.module.css';

const logos = [
  { src: '/images/partner-logos/bridgyia.png', alt: 'Bridgyia Cultural Center', width: 1200, height: 600, className: styles.logoTall },
  { src: '/images/partner-logos/lei-jiang.png', alt: 'Lei Jiang', width: 1200, height: 600, className: styles.logoTall },
  { src: '/images/partner-logos/logo-with-text.png', alt: 'Partner logo', width: 1200, height: 600, className: styles.logoStandard },
  { src: '/images/partner-logos/chillfit.jpg', alt: 'ChillFit', width: 1080, height: 600, className: styles.logoStandard },
];

export default function PartnerBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>SELECT COLLABORATORS & PARTNERS</p>
        <div className={styles.logoRow}>
          {logos.map((logo) => (
            <div key={logo.src} className={styles.logoWrap}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`${styles.logo} ${logo.className}`}
                sizes="(max-width: 768px) 40vw, 220px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
