import React from 'react';
import { PencilLine, Clock, ListChecks, Coins } from 'lucide-react';
import { LandingPageProps } from '../types';

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <PencilLine className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sentence Construction
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Select the correct words to complete the sentence by arranging
            the provided options in the right order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="flex justify-center mb-3">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Time Per Question</h3>
            <p className="text-2xl font-bold text-blue-600">30 sec</p>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="flex justify-center mb-3">
              <ListChecks className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Total Questions</h3>
            <p className="text-2xl font-bold text-blue-600">10</p>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="flex justify-center mb-3">
              <Coins className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Coins</h3>
            <p className="text-2xl font-bold text-blue-600">0</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={onStart}
            className="px-8 py-3 rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;