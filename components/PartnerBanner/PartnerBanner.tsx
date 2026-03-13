import Image from 'next/image';
import styles from './PartnerBanner.module.css';

const logos = [
  { src: '/images/partner-logos/bridgyia.png', alt: 'Bridgyia Cultural Center' },
  { src: '/images/partner-logos/lei-jiang.png', alt: 'Lei Jiang' },
  { src: '/images/partner-logos/logo-with-text.png', alt: 'Partner logo' },
  { src: '/images/partner-logos/chillfit.jpg', alt: 'ChillFit' },
];

export default function PartnerBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>SELECT COLLABORATORS & PARTNERS</p>
        <div className={styles.logoRow}>
          {logos.map((logo) => (
            <div key={logo.src} className={styles.logoWrap}>
              <Image src={logo.src} alt={logo.alt} fill className={styles.logo} sizes="(max-width: 768px) 40vw, 180px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
