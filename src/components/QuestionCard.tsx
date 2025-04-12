import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswers: (string | null)[];
  onSelectAnswer: (index: number, word: string | null) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswers,
  onSelectAnswer,
}) => {
  const sentenceParts = question.sentence.split('_');

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 text-lg">
          {sentenceParts.map((part, index) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < sentenceParts.length - 1 && (
                <button
                  onClick={() => onSelectAnswer(index, null)}
                  className={`min-w-24 px-4 py-1 rounded-md ${
                    selectedAnswers[index]
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'bg-gray-100'
                  }`}
                >
                  {selectedAnswers[index] || '______'}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                const emptyIndex = selectedAnswers.findIndex((ans) => ans === null);
                if (emptyIndex !== -1) {
                  onSelectAnswer(emptyIndex, option);
                }
              }}
              disabled={selectedAnswers.includes(option)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedAnswers.includes(option)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;