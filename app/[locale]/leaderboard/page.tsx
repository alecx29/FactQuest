import styles from './leaderboard.module.scss';
import LeaderboardHeader from './header';

// Define the type for a leaderboard entry
interface LeaderboardEntry {
  id: number;
  username: string;
  score: number;
  quizzesTaken: number;
  lastActive: string;
}

// Define the type for page params
interface PageParams {
  params: {
    locale: string;
  };
}

// This enables ISR - Incremental Static Regeneration
export const revalidate = 30; // Revalidate every 30 seconds

async function getLeaderboardData(locale: string): Promise<LeaderboardEntry[]> {
  
  // Simulate fetch delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Current timestamp to show the revalidation is working
  const timestamp = new Date().toISOString();
  
  // English leaderboard data
  const enLeaderboard: LeaderboardEntry[] = [
    {
      id: 1,
      username: "QuizMaster",
      score: 1250,
      quizzesTaken: 15,
      lastActive: timestamp
    },
    {
      id: 2,
      username: "TriviaPro",
      score: 980,
      quizzesTaken: 12,
      lastActive: timestamp
    },
    {
      id: 3,
      username: "KnowledgeSeeker",
      score: 875,
      quizzesTaken: 10,
      lastActive: timestamp
    },
    {
      id: 4,
      username: "QuizChampion",
      score: 750,
      quizzesTaken: 8,
      lastActive: timestamp
    },
    {
      id: 5,
      username: "BrainiacQuizzer",
      score: 620,
      quizzesTaken: 7,
      lastActive: timestamp
    }
  ];
  
  // Romanian leaderboard data
  const roLeaderboard: LeaderboardEntry[] = [
    {
      id: 1,
      username: "MaestruQuiz",
      score: 1250,
      quizzesTaken: 15,
      lastActive: timestamp
    },
    {
      id: 2,
      username: "ExpertTrivia",
      score: 980,
      quizzesTaken: 12,
      lastActive: timestamp
    },
    {
      id: 3,
      username: "CăutătorCunoștințe",
      score: 875,
      quizzesTaken: 10,
      lastActive: timestamp
    },
    {
      id: 4,
      username: "CampionQuiz",
      score: 750,
      quizzesTaken: 8,
      lastActive: timestamp
    },
    {
      id: 5,
      username: "GeniuQuiz",
      score: 620,
      quizzesTaken: 7,
      lastActive: timestamp
    }
  ];
  
  return locale === 'ro' ? roLeaderboard : enLeaderboard;
}

export default async function LeaderboardPage({ params }: PageParams) {
  // Get leaderboard data - this will be cached and revalidated every 30 seconds
  const leaderboardData = await getLeaderboardData(params.locale);
  
  return (
    <div className={styles.container}>
      <LeaderboardHeader />
      <div className={styles.leaderboardTable}>
        <div className={styles.tableHeader}>
          <div className={styles.rank}>#</div>
          <div className={styles.username}>Username</div>
          <div className={styles.score}>Score</div>
          <div className={styles.quizzesTaken}>Quizzes</div>
          <div className={styles.lastActive}>Last Active</div>
        </div>
        
        {leaderboardData.map((entry, index) => (
          <div key={entry.id} className={styles.tableRow}>
            <div className={styles.rank}>{index + 1}</div>
            <div className={styles.username}>{entry.username}</div>
            <div className={styles.score}>{entry.score}</div>
            <div className={styles.quizzesTaken}>{entry.quizzesTaken}</div>
            <div className={styles.lastActive}>
              {new Date(entry.lastActive).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 