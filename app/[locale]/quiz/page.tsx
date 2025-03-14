'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import styles from './quiz.module.scss';

export default function QuizPage() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('quizCard.title')}</h1>
      <p className={styles.description}>{t('quizCard.description')}</p>
      
      <div className={styles.quizOptions}>
        <Link href="/quiz/random" className={styles.quizButton}>
          Random Quiz
        </Link>
        {/* Aici pot fi adăugate alte categorii de quiz-uri */}
      </div>
    </div>
  );
} 