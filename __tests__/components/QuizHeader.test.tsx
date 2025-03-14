import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizHeader from '../../app/[locale]/quiz/random/header';

// Mock pentru useTranslations care poate returna traduceri în funcție de limba selectată
const mockTranslations = {
  en: {
    'title': 'Random Quiz',
    'description': 'Answer the following questions:',
    'refreshInfo': 'This page updates every 30 seconds'
  },
  ro: {
    'title': 'Quiz Aleatoriu',
    'description': 'Răspunde la următoarele întrebări:',
    'refreshInfo': 'Această pagină se actualizează la fiecare 30 de secunde'
  }
};

// Variabilă pentru a controla limba curentă în teste
let currentLocale = 'en';

// Mock the useTranslations hook
jest.mock('next-intl', () => ({
  useTranslations: () => {
    return (key: string) => {
      const translations = mockTranslations[currentLocale as keyof typeof mockTranslations];
      return translations[key as keyof typeof translations] || key;
    };
  },
  useLocale: () => currentLocale
}));

describe('QuizHeader Component', () => {
  afterEach(() => {
    // Resetăm limba la engleză după fiecare test
    currentLocale = 'en';
  });

  test('renders quiz header with correct English translations', () => {
    // Setăm limba la engleză
    currentLocale = 'en';
    
    render(<QuizHeader />);
    
    // Check if the title is rendered in English
    expect(screen.getByText('Random Quiz')).toBeInTheDocument();
    
    // Check if the description is rendered in English
    expect(screen.getByText('Answer the following questions:')).toBeInTheDocument();
  });

  test('renders quiz header with correct Romanian translations', () => {
    // Setăm limba la română
    currentLocale = 'ro';
    
    render(<QuizHeader />);
    
    // Check if the title is rendered in Romanian
    expect(screen.getByText('Quiz Aleatoriu')).toBeInTheDocument();
    
    // Check if the description is rendered in Romanian
    expect(screen.getByText('Răspunde la următoarele întrebări:')).toBeInTheDocument();
  });
}); 