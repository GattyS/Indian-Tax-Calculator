import React, { useState } from 'react';
import FrequencyInput from '../shared/FrequencyInput';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S04_SalaryDetails({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const basic = Number(data.basicSalary) || 0;
  const takeHome = Number(data.takeHomeSalary) || 0;
  
  const annualBasic = data.basicSalaryFreq === 'monthly' ? basic * 12 : basic;
  const annualTakeHome = data.takeHomeSalaryFreq === 'monthly' ? takeHome * 12 : takeHome;
  
  const hasError = annualTakeHome > 0 && annualBasic > annualTakeHome;
  const isValid = basic > 0 && !hasError;

  const handleNext = () => {
    if (isValid) goNext();
  };

  const faqs = [
    {
      question: "What is Basic Salary?",
      answer: "Basic salary is the base component of your income, typically 40-50% of your total CTC. You can find this exactly on your payslip."
    },
    {
      question: "Why do you need my Take-Home Salary?",
      answer: "We use it as a rough estimate for your gross income to provide an early tax preview before you enter all your individual allowances."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Salary Details</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="space-y-6">
        <FrequencyInput 
          label="Basic Salary"
          value={data.basicSalary}
          onChange={(val) => update({ basicSalary: val })}
          frequency={data.basicSalaryFreq}
          onFrequencyChange={(val) => update({ basicSalaryFreq: val })}
          subtext="Found on your payslip. Used for HRA and NPS calculations."
        />

        <FrequencyInput 
          label="Take-Home Salary (Approximate)"
          value={data.takeHomeSalary}
          onChange={(val) => update({ takeHomeSalary: val })}
          frequency={data.takeHomeSalaryFreq}
          onFrequencyChange={(val) => update({ takeHomeSalaryFreq: val })}
          subtext="Your gross salary before tax. Don't worry if it's not exact yet."
          error={hasError ? "Basic salary cannot be greater than take-home salary." : null}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={goBack} className="px-6 py-3.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button 
          onClick={handleNext}
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
