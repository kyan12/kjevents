import styles from './page.module.css';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm/ContactForm';

export default function OtherEventsPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.preTitle}>Kira Jia Events</span>
          <h1 className={styles.heroTitle}>Curated Experiences<br/>at Every Scale</h1>
        </div>
      </section>

      {/* Services Divisions */}
      <section className={styles.divisionsSection}>
        <div className={styles.divisionGrid}>
          
          {/* Division 1 */}
          <div className={styles.divisionBlock}>
            <div className={styles.divisionHeader}>
              <span className={styles.divisionNum}>01</span>
              <h2>Special & Private Events</h2>
            </div>
            <p className={styles.divisionDesc}>
              Refined gatherings produced with careful attention to atmosphere, entertainment, and guest experience.
            </p>
            <ul className={styles.servicesList}>
              <li>Birthday celebrations</li>
              <li>Corporate celebrations</li>
              <li>Private receptions and milestone events</li>
              <li>Curated entertainment and performance programming</li>
            </ul>
          </div>

          {/* Division 2 */}
          <div className={styles.divisionBlock}>
            <div className={styles.divisionHeader}>
              <span className={styles.divisionNum}>02</span>
              <h2>Cultural, Music Festivals & Stage Productions</h2>
            </div>
            <p className={styles.divisionDesc}>
              Live performance production and cultural programming developed in collaboration with artists, agents, and production teams.
            </p>
            <ul className={styles.servicesList}>
              <li>Festival production planning and event curation</li>
              <li>Stage management and production coordination</li>
              <li>Artist booking and talent relations</li>
              <li>Live performance programming and scheduling</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Artist Relations Callout */}
      <section className={styles.artistInfoSection}>
        <div className={styles.artistInfoInner}>
          <p>
            Artist relations and booking are developed through{' '}
            <Link href="https://jiacreative.com/" className={styles.jiaLink} target="_blank" rel="noopener noreferrer">
              Jia Creative
            </Link>.
          </p>
        </div>
      </section>
      
      {/* Testimonials Placeholder */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.testimonialsTitle}>Testimonials</h2>
        <p className={styles.testimonialsPending}>Coming soon.</p>
      </section>

      <ContactForm />

    </main>
  );
}
