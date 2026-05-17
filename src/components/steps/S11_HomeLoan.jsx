import React, { useState } from 'react';
import NumberInput from '../shared/NumberInput';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S11_HomeLoan({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const faqs = [
    {
      question: "Can I claim home loan interest?",
      answer: "Under Section 24(b), you can claim up to ₹2 Lakhs per year on the interest paid for a self-occupied property."
    },
    {
      question: "What about the principal?",
      answer: "The principal repayment is covered under Section 80C, which has a combined limit of ₹1.5 Lakhs. You entered this in the 80C step."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Home Loan Interest</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
          <div>
            <p className="font-semibold text-gray-900">Do you have an active home loan?</p>
            <p className="text-sm text-gray-500">Section 24(b)</p>
          </div>
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only"
              checked={data.hasHomeLoan}
              onChange={(e) => update({ hasHomeLoan: e.target.checked })}
            />
            <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${data.hasHomeLoan ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${data.hasHomeLoan ? 'transform translate-x-6' : ''}`}></div>
          </div>
        </label>
        
        {data.hasHomeLoan && (
          <div className="reveal">
            <NumberInput 
              label="Annual Interest Paid"
              value={data.homeLoanInterest}
              onChange={(val) => update({ homeLoanInterest: val })}
              placeholder="200000"
              subtext="Capped at ₹2,00,000 per year for a self-occupied house."
            />
          </div>
        )}
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
