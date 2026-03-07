import Image from 'next/image';
import styles from './page.module.css';
import ContactForm from '@/components/ContactForm/ContactForm';

export default function WeddingsPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Where Heritage and Modern Elegance Converge</h1>
          <p className={styles.heroSubtext}>
            Bespoke weddings blending Western elegance, Chinese heritage, and modern fusion storytelling — refined, intentional, and deeply personal.
          </p>
          <button className={styles.journeyBtn}>Begin your journey</button>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>Meet Kira</h2>
            <p>
              Kira is the founder of Kira Jia Events, a boutique planning studio specializing in refined weddings that thoughtfully bridge cultures and traditions. With a bicultural background and deep understanding of both Western and Asian celebrations, Kira approaches each wedding with discernment, structure, and a strong sense of storytelling.
            </p>
            <p>
              Drawing from extensive experience in event planning and large-scale production management, she brings a balance of creativity and logistical precision to every celebration.
            </p>
            <ul className={styles.aboutList}>
              <li>Bilingual and bicultural expertise</li>
              <li>Established relationships with trusted venues and vendor partners</li>
              <li>A structured and detail-oriented planning and coordination process</li>
              <li>Personalized entertainment curation, drawing from experience in live performance and event production</li>
            </ul>
          </div>
          
          <div className={styles.kiraPortraitWrapper}>
            <Image src="/images/kira_portrait.jpg" alt="Kira Jia" fill style={{ objectFit: 'cover' }} priority />
          </div>
        </div>

        <div className={styles.availabilityCardWide}>
          <h3>Availability</h3>
          <p><strong>2026:</strong> Currently accepting Wedding Day Management Inquiries, with limited Partial Planning engagements.</p>
          <p><strong>2027:</strong> Full Planning inquiries are now open.</p>
          <a href="#contact" className={styles.availabilityCta}>Inquire About Your Date</a>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.servicesHeader}>Services</h2>
        
        <div className={styles.servicesGrid}>
          {/* Card 1 */}
          <div className={styles.serviceCard}>
            <h3>Wedding Day Management</h3>
            <span className={styles.chineseSubtext}>婚礼当日协调</span>
            <p className={styles.serviceDesc}>
              Designed for couples who have completed their planning and seek professional coordination to ensure the wedding day unfolds seamlessly. Starts at $800.
            </p>
            <ul className={styles.serviceList}>
              <li>Venue walkthrough & layout confirmation</li>
              <li>Vendor coordination & timeline creation</li>
              <li>Ceremony & reception management</li>
              <li>Bilingual vendor & guest communication</li>
              <li>Full-day coordination coverage</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className={styles.serviceCard}>
            <h3>Partial Planning</h3>
            <span className={styles.chineseSubtext}>部分策划服务</span>
            <p className={styles.serviceDesc}>
              Ideal for couples who have begun planning and seek professional guidance to refine logistics, coordinate vendors, and ensure a cohesive celebration.
            </p>
            <ul className={styles.serviceList}>
              <li>Vendor recommendations and booking</li>
              <li>Design & styling consultation</li>
              <li>Budget management assistance</li>
              <li>Monthly planning sessions</li>
              <li>Wedding Day Management included</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className={styles.serviceCard}>
            <h3>Full Planning</h3>
            <span className={styles.chineseSubtext}>全程婚礼策划</span>
            <p className={styles.serviceDesc}>
              Designed for couples seeking a fully guided planning experience, from initial concept to the final moment of celebration.
            </p>
            <ul className={styles.serviceList}>
              <li>Comprehensive planning, design, and event production</li>
              <li>Curated vendor sourcing and booking</li>
              <li>Custom mood board creation</li>
              <li>Cultural elements integration</li>
              <li>Includes full-service coordination</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.servicesBottom}>
          <p className={styles.pricingNote}>Partial and Full Planning are custom-quoted based on scope and celebration scale.</p>
          <div className={styles.servicesImageWrapper}>
            <Image src="/images/wedding_services_group.jpg" alt="Bridal Party Group Photo" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Featured Weddings */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Weddings</h2>
        
        <div className={styles.featureBlock}>
          <div className={styles.imageWrapper}>
            <Image src="/images/jialin-jonathan-ceremony.jpg" alt="Jialin & Jonathan wedding ceremony" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.featureContent}>
            <h3>Jialin & Jonathan</h3>
            <p className={styles.testimonial}>
              "Kira knew exactly how to blend traditions while keeping everything modern and elegant... our wedding went so smoothly because she facilitated the whole thing."
            </p>
          </div>
        </div>

        <div className={styles.featureBlockAlternate}>
          <div className={styles.felicityGallery}>
            <div className={styles.imageWrapperWide}>
              <Image src="/images/felicity-stairs-group.jpg" alt="Felicity and Leon wedding portrait on the staircase" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.felicityBottomRow}>
              <div className={styles.imageWrapper}>
                <Image src="/images/felicity-detail.jpg" alt="Felicity and Leon invitation details" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/images/felicity-flowers.jpg" alt="Felicity and Leon bridal bouquet detail" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className={styles.featureContent}>
            <h3>Felicity & Leon</h3>
            <span className={styles.venueLoc}>The Mansion at Glen Cove, Long Island</span>
            <p>
              Set within the historic Mansion at Glen Cove, this elegant estate wedding brought together timeless romance with meaningful cultural traditions. Surrounded by the venue’s grand architecture and thoughtfully incorporated cultural elements, the celebration created a refined and distinctive setting for family and friends.
            </p>
            <div className={styles.highlightsContainer}>
              <h4>Highlights</h4>
              <ul>
                <li>Full-service wedding planning from concept development through execution</li>
                <li>Cultural consultation and integration of Chinese traditions</li>
                <li>Bilingual coordination with vendors, guests, and family members</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <ContactForm />
      </section>

    </main>
  );
}
