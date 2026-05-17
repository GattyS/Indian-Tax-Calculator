import React, { useState } from 'react';

export default function CommonQuestions({ questions = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm reveal">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-xl">🤔</span> Common Questions
      </h3>
      <div className="space-y-3">
        {questions.map((q, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button 
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
              >
                <span className="font-medium text-gray-800 text-sm">{q.question}</span>
                <span className={`text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {isOpen && (
                <div className="px-4 py-3 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {q.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
