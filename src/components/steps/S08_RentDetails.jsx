import React, { useState } from 'react';
import NumberInput from '../shared/NumberInput';
import RadioGroup from '../shared/RadioGroup';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S08_RentDetails({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const cityOptions = [
    { id: 'metro', title: 'Metro City', description: 'Delhi, Mumbai, Kolkata, Chennai (50% Basic limit)' },
    { id: 'nonMetro', title: 'Non-Metro City', description: 'Any other city (40% Basic limit)' }
  ];

  const isValid = Number(data.monthlyRent) > 0 && data.cityType !== null;

  const faqs = [
    {
      question: "How is HRA exemption calculated?",
      answer: "It's the minimum of: 1) Actual HRA received, 2) Rent paid minus 10% of basic salary, 3) 50% of basic (Metro) or 40% of basic (Non-Metro)."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Rent Details</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <NumberInput 
          label="Monthly Rent Paid"
          value={data.monthlyRent}
          onChange={(val) => update({ monthlyRent: val })}
          placeholder="15000"
        />

        {data.hasHRA && (
          <div className="space-y-3">
             <NumberInput 
              label="Monthly HRA Received"
              value={data.hraMonthly}
              onChange={(val) => update({ hraMonthly: val })}
              placeholder="5000"
              subtext="Check your payslip. Needed for exact calculation."
            />
          </div>
        )}

        <RadioGroup 
          label="Where do you live?"
          options={cityOptions}
          value={data.cityType}
          onChange={(val) => update({ cityType: val })}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={goBack} className="px-6 py-3.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button 
          onClick={goNext}
          disabled={!isValid}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold shadow-md transition-all ${
            isValid 
              ? 'bg-gradient-to-r from-blue-800 to-teal-600 text-white hover:-translate-y-0.5' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          Continue
        </button>
      </div>

      {showQuestions && <CommonQuestions questions={faqs} />}
    </div>
  );
}
