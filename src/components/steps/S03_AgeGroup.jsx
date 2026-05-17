import React, { useState } from 'react';
import RadioGroup from '../shared/RadioGroup';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S03_AgeGroup({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const options = [
    { id: 'below60', title: 'Below 60 years', description: 'Standard tax slabs — nil up to ₹2.5L' },
    { id: 'senior', title: '60 to 79 years', description: 'Senior citizen — nil up to ₹3L' },
    { id: 'superSenior', title: '80 years or above', description: 'Super senior — nil up to ₹5L' }
  ];

  const faqs = [
    {
      question: "Why does my age matter for tax?",
      answer: "Senior citizens (60–79) get a higher basic exemption limit of ₹3 Lakh, and super senior citizens (80+) get ₹5 Lakh — compared to ₹2.5 Lakh for others under the old regime."
    },
    {
      question: "Do senior citizens get extra deductions?",
      answer: "Yes! Under Section 80TTB, senior citizens can deduct up to ₹50,000 on interest income (FD + savings). Also, the 80D health insurance limit is ₹50,000 for them (vs ₹25,000 for others)."
    },
    {
      question: "Does age affect the New Regime?",
      answer: "No. The New Regime has the same slabs for everyone regardless of age. The age-based benefits only apply to the Old Regime."
    }
  ];

  const handleNext = () => {
    if (data.ageGroup) goNext();
  };

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What is your age group?</h2>
            <p className="text-gray-500 mb-8">Senior citizens enjoy higher tax exemption limits under the Old Regime.</p>
          </div>
          <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
        </div>

        <RadioGroup 
          options={options}
          value={data.ageGroup}
          onChange={(val) => update({ ageGroup: val })}
        />

        <div className="mt-8 flex gap-4">
          <button onClick={goBack} className="px-6 py-3.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button 
            onClick={handleNext}
            disabled={!data.ageGroup}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold shadow-md transition-all ${
              data.ageGroup 
                ? 'bg-gradient-to-r from-blue-800 to-teal-600 text-white hover:-translate-y-0.5' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            Continue
          </button>
        </div>
      </div>

      {showQuestions && <CommonQuestions questions={faqs} />}
    </div>
  );
}
