'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';
import styles from './page.module.scss';

// This ensures the page is statically generated (SSG)
export const dynamic = 'force-static';

export default function Home() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{t('title')}</h1>
        <h2 className={styles.subtitle}>{t('subtitle')}</h2>
        <div className={styles.buttons}>
          <Link href="/quiz" className={styles.primaryButton}>
            {t('startQuiz')}
          </Link>
          <Link href="/leaderboard" className={styles.secondaryButton}>
            {t('viewLeaderboard')}
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.description}>
          <p>{t('description')}</p>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>{t('quizCard.title')}</h3>
            <p>{t('quizCard.description')}</p>
          </div>
          <div className={styles.card}>
            <h3>{t('leaderboardCard.title')}</h3>
            <p>{t('leaderboardCard.description')}</p>
          </div>
          <div className={styles.card}>
            <h3>{t('dashboardCard.title')}</h3>
            <p>{t('dashboardCard.description')}</p>
          </div>
        </div>
      </section>
    </div>
  );
} 