import Link from 'next/link';
import styles from './PartnerBanner.module.css';

export default function PartnerBanner() {
  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Artist relations and booking are developed through{' '}
        <Link
          href="https://jiacreative.com/"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Jia Creative
        </Link>
        .
      </p>
    </div>
  );
}
