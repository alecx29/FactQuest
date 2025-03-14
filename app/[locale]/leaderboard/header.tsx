import { useTranslations } from 'next-intl';
import styles from './leaderboard.module.scss';

export default function LeaderboardHeader() {
  const t = useTranslations('leaderboard');
  
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
      <p className={styles.refreshInfo}>{t('refreshInfo')}</p>
    </div>
  );
} 