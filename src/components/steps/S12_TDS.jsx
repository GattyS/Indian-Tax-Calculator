import React, { useState } from 'react';
import NumberInput from '../shared/NumberInput';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S12_TDS({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const faqs = [
    {
      question: "What is TDS?",
      answer: "TDS stands for Tax Deducted at Source. Your employer or bank may have already paid some tax on your behalf to the government."
    },
    {
      question: "Where do I find my Employer TDS?",
      answer: "Check your Form 16 (Part A) or your latest payslips. It will show the total tax deducted by your employer so far."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Tax Already Paid (TDS)</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">🏛️</div>
          <p className="text-sm text-blue-950 font-medium">Entering TDS helps us tell you exactly how much refund you'll get, or how much more you need to pay.</p>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <NumberInput 
            label="TDS deducted by Employer"
            value={data.employerTDS}
            onChange={(val) => update({ employerTDS: val })}
            placeholder="0"
            subtext="From Form 16 or payslips"
          />

          <NumberInput 
            label="TDS deducted by Banks/Others"
            value={data.otherTDS}
            onChange={(val) => update({ otherTDS: val })}
            placeholder="0"
            subtext="From Form 26AS or AIS"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={goBack} className="px-6 py-3.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button 
          onClick={goNext}
          className="flex-1 py-3.5 px-6 rounded-xl font-bold shadow-md transition-all bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:-translate-y-0.5"
        >
          Calculate My Tax
        </button>
      </div>

      {showQuestions && <CommonQuestions questions={faqs} />}
    </div>
  );
}
