import styles from './random.module.scss';
import QuizActions from './actions';
import QuizHeader from './header';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// This function will be executed on the server at each request
// This is an SSR implementation
export const dynamic = 'force-dynamic'; // Forces SSR

async function getRandomQuestions(locale: string): Promise<Question[]> {
  // Simulate a delay to demonstrate that it is an asynchronous request since data is mocked
  await new Promise(resolve => setTimeout(resolve, 500));

  // Questions in Romanian
  const roQuestions: Question[] = [
    {
      id: 1,
      question: 'Care este capitala României?',
      options: ['București', 'Cluj', 'Iași', 'Timișoara'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Cine a scris "Luceafărul"?',
      options: ['Ion Creangă', 'Mihai Eminescu', 'George Coșbuc', 'Nichita Stănescu'],
      correctAnswer: 1
    }
  ];

  // Questions in English
  const enQuestions: Question[] = [
    {
      id: 1,
      question: 'What is the capital of Romania?',
      options: ['Bucharest', 'Cluj', 'Iasi', 'Timisoara'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Who wrote "Luceafărul" (The Evening Star)?',
      options: ['Ion Creanga', 'Mihai Eminescu', 'George Cosbuc', 'Nichita Stanescu'],
      correctAnswer: 1
    }
  ];

  // Return questions based on locale
  return locale === 'ro' ? roQuestions : enQuestions;
}

export default async function RandomQuizPage({
  params
}: {
  params: { locale: string }
}) {
  // get the random questions - this code runs on the server (SSR)
  const questions = await getRandomQuestions(params.locale);
  
  return (
    <div className={styles.container}>
      <QuizHeader />
      <QuizActions questions={questions} />
    </div>
  );
} 