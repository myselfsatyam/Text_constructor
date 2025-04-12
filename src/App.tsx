import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { GameState, Question } from './types';
import Timer from './components/Timer';
import QuestionCard from './components/QuestionCard';
import FeedbackScreen from './components/FeedbackScreen';
import LandingPage from './components/LandingPage';

const TIMER_DURATION = 30;

// Json server
const fetchQuestions = async (): Promise<Question[]> => {
  // Provide json data
  return [
    {
      id: 1,
      sentence: "The company's _ approach to product development _ customer feedback at every stage, _ user satisfaction and _ a loyal consumer base.",
      blanks: ['User-centric', 'Incorporated', 'Enhancing', 'Cultivating'],
      options: ['Incorporated', 'User-centric', 'Enhancing', 'Cultivating'],
      correctAnswers: ['User-centric', 'Incorporated', 'Enhancing', 'Cultivating'],
    },
    {
      id: 2,
      sentence: 'The _ musical performance _ elements from various genres, _ the audience with its unique sound and _ critical acclaim from industry experts.',
      blanks: ['Eclectic', 'Blended', 'Captivating', 'Garnering'],
      options: ['Captivating', 'Eclectic', 'Garnering', 'Blended'],
      correctAnswers: ['Eclectic', 'Blended', 'Captivating', 'Garnering'],
    },
    {
      id: 3,
      sentence: "The scientist's _ research on quantum computing _ new possibilities for data processing, _ traditional limitations and _ the way for groundbreaking technological advancements.",
      blanks: ['Pioneering', 'Opened up', 'Overcoming', 'Paving'],
      options: ['Pioneering', 'Paving', 'Overcoming', 'Opened up'],
      correctAnswers: ['Pioneering', 'Opened up', 'Overcoming', 'Paving'],
    },
    {
      id: 4,
      sentence: 'The _ implementation of machine learning algorithms in medical diagnostics _ early detection of diseases, _ treatment outcomes and _ the workload of healthcare professionals.',
      blanks: ['Revolutionary', 'Enabled', 'Improving', 'Reducing'],
      options: ['Improving', 'Reducing', 'Enabled', 'Revolutionary'],
      correctAnswers: ['Revolutionary', 'Enabled', 'Improving', 'Reducing'],
    },
    {
      id: 5,
      sentence: "The _ security breach at the tech giant _ millions of users' data, _ concerns about online privacy and _ calls for stricter regulations.",
      blanks: ['Massive', 'Compromised', 'Raising', 'Prompting'],
      options: ['Raising', 'Massive', 'Prompting', 'Compromised'],
      correctAnswers: ['Massive', 'Compromised', 'Raising', 'Prompting'],
    },
    {
      id: 6,
      sentence: 'The _ educational reform _ a more inclusive curriculum, _ equal opportunities for all students and _ the overall quality of public schooling.',
      blanks: ['Comprehensive', 'Implemented', 'Promoting', 'Enhancing'],
      options: ['Comprehensive', 'Enhancing', 'Implemented', 'Promoting'],
      correctAnswers: ['Comprehensive', 'Implemented', 'Promoting', 'Enhancing'],
    },
    {
      id: 7,
      sentence: "The company's _ commitment to sustainability _ eco-friendly practices across all departments, _ its carbon footprint and _ a model for corporate responsibility.",
      blanks: ['Unwavering', 'Implemented', 'Reducing', 'Setting'],
      options: ['Implemented', 'Setting', 'Unwavering', 'Reducing'],
      correctAnswers: ['Unwavering', 'Implemented', 'Reducing', 'Setting'],
    },
    {
      id: 8,
      sentence: 'The _ implementation of artificial intelligence in healthcare _ patient outcomes, _ the workload of medical professionals and _ new avenues for personalized treatment.',
      blanks: ['Gradual', 'Improved', 'Reducing', 'Opening'],
      options: ['Opening', 'Improved', 'Gradual', 'Reducing'],
      correctAnswers: ['Gradual', 'Improved', 'Reducing', 'Opening'],
    },
    {
      id: 9,
      sentence: 'The _ festival _ artists from diverse backgrounds, _ cultural exchange and _ a platform for emerging talents to showcase their work.',
      blanks: ['International', 'Brought together', 'Promoting', 'Providing'],
      options: ['Providing', 'Brought together', 'Promoting', 'International'],
      correctAnswers: ['International', 'Brought together', 'Promoting', 'Providing'],
    },
    {
      id: 10,
      sentence: 'The _ implementation of smart city technologies _ urban efficiency and sustainability, _ quality of life for residents and _ a model for future urban development.',
      blanks: ['Widespread', 'Improved', 'Enhancing', 'Providing'],
      options: ['Enhancing', 'Improved', 'Providing', 'Widespread'],
      correctAnswers: ['Widespread', 'Improved', 'Enhancing', 'Providing'],
    },
  ];
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    questions: [],
    selectedAnswers: [],
    timeRemaining: TIMER_DURATION,
    isLoading: true,
    error: null,
    isGameComplete: false,
    answersHistory: [],
    gameStarted: false,
    coins: 0,
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions();
        setGameState((prev) => ({
          ...prev,
          questions,
          selectedAnswers: Array(questions[0].blanks.length).fill(null),
          answersHistory: Array(questions.length).fill([]),
          isLoading: false,
        }));
      } catch (error) {
        setGameState((prev) => ({
          ...prev,
          error: 'Failed to load questions',
          isLoading: false,
        }));
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (!gameState.gameStarted || gameState.isGameComplete) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeRemaining <= 0) {
          handleNextQuestion();
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameStarted, gameState.isGameComplete]);

  const handleSelectAnswer = (index: number, word: string | null) => {
    setGameState((prev) => ({
      ...prev,
      selectedAnswers: prev.selectedAnswers.map((ans, i) => (i === index ? word : ans)),
    }));
  };

  const handleNextQuestion = () => {
    setGameState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const updatedAnswersHistory = [...prev.answersHistory];
      updatedAnswersHistory[prev.currentQuestionIndex] = prev.selectedAnswers;

      if (nextIndex >= prev.questions.length) {
        return {
          ...prev,
          isGameComplete: true,
          answersHistory: updatedAnswersHistory,
        };
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedAnswers: Array(prev.questions[nextIndex].blanks.length).fill(null),
        timeRemaining: TIMER_DURATION,
        answersHistory: updatedAnswersHistory,
      };
    });
  };

  const handleStartGame = () => {
    setGameState((prev) => ({
      ...prev,
      gameStarted: true,
      timeRemaining: TIMER_DURATION,
    }));
  };

  const handleRestartGame = () => {
    setGameState((prev) => ({
      ...prev,
      currentQuestionIndex: 0,
      selectedAnswers: Array(prev.questions[0].blanks.length).fill(null),
      timeRemaining: TIMER_DURATION,
      isGameComplete: false,
      gameStarted: false,
      answersHistory: Array(prev.questions.length).fill([]),
    }));
  };

  if (gameState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading questions...</div>
      </div>
    );
  }

  if (gameState.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{gameState.error}</div>
      </div>
    );
  }

  if (!gameState.gameStarted) {
    return <LandingPage onStart={handleStartGame} />;
  }

  if (gameState.isGameComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <FeedbackScreen
          questions={gameState.questions}
          answersHistory={gameState.answersHistory}
          onRestartGame={handleRestartGame}
        />
      </div>
    );
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const isAllAnswered = !gameState.selectedAnswers.includes(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
        <div className="text-2xl font-bold text-gray-800">
          Question {gameState.currentQuestionIndex + 1}/{gameState.questions.length}
        </div>
        <Timer
          timeRemaining={gameState.timeRemaining}
          onTimeEnd={handleNextQuestion}
        />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswers={gameState.selectedAnswers}
        onSelectAnswer={handleSelectAnswer}
      />

      <button
        onClick={handleNextQuestion}
        disabled={!isAllAnswered}
        className={`mt-8 flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
          isAllAnswered
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next Question
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App;