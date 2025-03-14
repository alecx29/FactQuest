'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './random.module.scss';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizActionsProps {
  questions: Question[];
}

export default function QuizActions({ questions }: QuizActionsProps) {
  const t = useTranslations('quiz.random');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    // check if all questions were answeered
    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert(t('pleaseAnswerAll'));
      return;
    }

    // calculate the score
    let newScore = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        newScore++;
      }
    });

    setScore(newScore);
    setShowResults(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <>
      <div className={styles.questions}>
        {questions.map((question) => (
          <div key={question.id} className={styles.questionCard}>
            <h3 className={styles.questionText}>{question.question}</h3>
            <div className={styles.options}>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.optionButton} ${
                    selectedAnswers[question.id] === index ? styles.selected : ''
                  } ${
                    showResults
                      ? index === question.correctAnswer
                        ? styles.correct
                        : selectedAnswers[question.id] === index
                        ? styles.incorrect
                        : ''
                      : ''
                  }`}
                  onClick={() => !showResults && handleSelectOption(question.id, index)}
                  disabled={showResults}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.actions}>
        {showResults ? (
          <>
            <div className={styles.results}>
              <h2>{t('scoreText', { score: score, total: questions.length })}</h2>
              <p>{score === questions.length ? t('congratsText') : t('tryAgainText')}</p>
            </div>
            <button className={styles.submitButton} onClick={handleTryAgain}>
              {t('tryAgainButton')}
            </button>
          </>
        ) : (
          <button className={styles.submitButton} onClick={handleSubmit}>
            {t('submitButton')}
          </button>
        )}
      </div>
    </>
  );
} 