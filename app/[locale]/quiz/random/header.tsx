'use client';

import { useTranslations } from 'next-intl';
import styles from './random.module.scss';

export default function QuizHeader() {
  const t = useTranslations('quiz.random');
  
  return (
    <>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </>
  );
} 