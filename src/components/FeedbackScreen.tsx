import React from 'react';
import { RefreshCcw, Check, X } from 'lucide-react';
import { FeedbackProps } from '../types';

const FeedbackScreen: React.FC<FeedbackProps> = ({
  questions,
  answersHistory,
  onRestartGame,
}) => {
  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, idx) => {
      const userAnswers = answersHistory[idx] || [];
      const isCorrect = question.correctAnswers.every(
        (answer, index) => answer === userAnswers[index]
      );
      if (isCorrect) correctCount++;
    });
    return correctCount;
  };

  const score = calculateScore();
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Complete!</h2>
        <div className="text-5xl font-bold mb-2">
          <span className={percentage >= 70 ? 'text-green-600' : 'text-red-600'}>
            {score}
          </span>
          <span className="text-gray-600">/{totalQuestions}</span>
        </div>
        <p className="text-lg text-gray-600">
          You got {score} out of {totalQuestions} questions correct ({Math.round(percentage)}%)
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, questionIndex) => {
          const userAnswers = answersHistory[questionIndex] || [];
          const isCorrect = question.correctAnswers.every(
            (answer, index) => answer === userAnswers[index]
          );

          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
                <h3 className="font-semibold">Question {questionIndex + 1}</h3>
              </div>

              <div className="mb-2">
                {question.sentence.split('_').map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < question.correctAnswers.length && (
                      <span
                        className={`mx-1 px-2 py-1 rounded ${
                          userAnswers[index] === question.correctAnswers[index]
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {userAnswers[index] || '_____'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {!isCorrect && (
                <div className="text-sm text-gray-600">
                  Correct answer:{' '}
                  {question.correctAnswers.map((answer, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && ' - '}
                      <span className="font-semibold text-gray-800">{answer}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onRestartGame}
        className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <RefreshCcw className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
};

export default FeedbackScreen;