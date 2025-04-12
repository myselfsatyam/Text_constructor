export interface Question {
  id: number;
  sentence: string;
  blanks: string[];
  options: string[];
  correctAnswers: string[];
}

export interface GameState {
  currentQuestionIndex: number;
  questions: Question[];
  selectedAnswers: (string | null)[];
  timeRemaining: number;
  isLoading: boolean;
  error: string | null;
  isGameComplete: boolean;
  answersHistory: (string | null)[][];
  gameStarted: boolean;
  coins: number;
}

export interface FeedbackProps {
  questions: Question[];
  answersHistory: (string | null)[][];
  onRestartGame: () => void;
}

export interface LandingPageProps {
  onStart: () => void;
  onBack?: () => void;
}