import React, { useState } from 'react';
import NumberInput from '../shared/NumberInput';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S06_OtherIncome({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const faqs = [
    {
      question: "Do I have to declare savings account interest?",
      answer: "Yes. All interest earned on savings accounts must be declared. However, Section 80TTA allows a deduction of up to ₹10,000 for this interest in the old regime."
    },
    {
      question: "What about Fixed Deposits (FDs)?",
      answer: "FD interest is fully taxable under 'Income from Other Sources'. Even if the bank deducts TDS, you must declare the total interest here."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Other Income</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">💰</div>
          <p className="text-sm text-blue-950 font-medium">Include income from bank interest, dividends, and other non-salary sources.</p>
        </div>

        <div className="space-y-4">
          <NumberInput 
            label="Interest from Savings Accounts"
            value={data.savingsInterest}
            onChange={(val) => update({ savingsInterest: val })}
            placeholder="0"
          />

          <NumberInput 
            label="Interest from FDs, Bonds, etc."
            value={data.fdInterest}
            onChange={(val) => update({ fdInterest: val })}
            placeholder="0"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={goBack} className="px-6 py-3.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button 
          onClick={goNext}
          className="flex-1 py-3.5 px-6 rounded-xl font-bold shadow-md transition-all bg-gradient-to-r from-blue-800 to-teal-600 text-white hover:-translate-y-0.5"
        >
          Continue
        </button>
      </div>

      {showQuestions && <CommonQuestions questions={faqs} />}
    </div>
  );
}
