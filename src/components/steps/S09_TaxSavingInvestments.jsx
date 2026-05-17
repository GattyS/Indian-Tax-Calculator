import React, { useState } from 'react';
import NumberInput from '../shared/NumberInput';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S09_TaxSavingInvestments({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const calculateTotal80C = () => {
    let total = 0;
    Object.values(data.investments80C).forEach(val => {
      total += Number(val) || 0;
    });
    return total;
  };

  const total80C = calculateTotal80C();
  const limit80C = 150000;
  const progressPercent = Math.min(100, (total80C / limit80C) * 100);

  const handleUpdate80C = (key, val) => {
    update({
      investments80C: {
        ...data.investments80C,
        [key]: val
      }
    });
  };

  const faqs = [
    {
      question: "What is the 80C limit?",
      answer: "The maximum deduction you can claim under Section 80C is ₹1.5 Lakhs per year. Even if you invest more, you only get benefit up to this limit."
    },
    {
      question: "Is Personal NPS different from Employer NPS?",
      answer: "Yes! Section 80CCD(1B) allows an additional ₹50,000 deduction for personal NPS contributions, over and above the ₹1.5L 80C limit."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Tax Saving Investments</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Section 80C Investments</h3>
          
          {/* Progress Bar for 80C */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-gray-600">Total 80C</span>
              <span className={total80C > limit80C ? 'text-green-600' : 'text-gray-900'}>
                ₹{total80C.toLocaleString('en-IN')} / ₹1.5L Limit
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${total80C >= limit80C ? 'bg-green-500' : 'bg-blue-700'}`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {total80C > limit80C && (
              <p className="text-xs text-green-600 mt-2 font-medium">Maximum limit reached!</p>
            )}
          </div>

          <div className="space-y-4">
            <NumberInput 
              label="Employee Provident Fund (EPF)"
              value={data.investments80C.epf}
              onChange={(val) => handleUpdate80C('epf', val)}
              placeholder="0"
              subtext="Your contribution only (check payslip)"
            />
            <NumberInput 
              label="Public Provident Fund (PPF)"
              value={data.investments80C.ppf}
              onChange={(val) => handleUpdate80C('ppf', val)}
              placeholder="0"
            />
            <NumberInput 
              label="ELSS Mutual Funds / LIC Premium"
              value={data.investments80C.elss}
              onChange={(val) => handleUpdate80C('elss', val)}
              placeholder="0"
            />
            <NumberInput 
              label="Home Loan Principal Repayment"
              value={data.investments80C.homeLoanPrincipal}
              onChange={(val) => handleUpdate80C('homeLoanPrincipal', val)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Additional Deductions</h3>
          <label className="flex items-center justify-between cursor-pointer mb-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div>
              <p className="font-semibold text-gray-900">Personal NPS</p>
              <p className="text-sm text-gray-500">Extra ₹50k deduction under 80CCD(1B)</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={data.hasPersonalNPS}
                onChange={(e) => update({ hasPersonalNPS: e.target.checked })}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${data.hasPersonalNPS ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${data.hasPersonalNPS ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
          
          {data.hasPersonalNPS && (
            <div className="reveal">
              <NumberInput 
                label="Annual NPS Investment"
                value={data.personalNPS}
                onChange={(val) => update({ personalNPS: val })}
                placeholder="50000"
                subtext="Capped at ₹50,000"
              />
            </div>
          )}
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
