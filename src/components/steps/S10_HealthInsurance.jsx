import React, { useState } from 'react';
import NumberInput from '../shared/NumberInput';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';
import RadioGroup from '../shared/RadioGroup';

export default function S10_HealthInsurance({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const faqs = [
    {
      question: "What is Section 80D?",
      answer: "Section 80D allows a deduction for health insurance premiums. You get up to ₹25,000 for yourself/family, and an additional ₹25,000 for parents (or ₹50,000 if parents are senior citizens)."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Health Insurance (80D)</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div>
              <p className="font-semibold text-gray-900">Self & Family</p>
              <p className="text-sm text-gray-500">Premium for yourself, spouse, children</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={data.hasSelfInsurance}
                onChange={(e) => update({ hasSelfInsurance: e.target.checked })}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${data.hasSelfInsurance ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${data.hasSelfInsurance ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
          
          {data.hasSelfInsurance && (
            <div className="reveal">
              <NumberInput 
                label="Annual Premium Paid"
                value={data.selfInsurancePremium}
                onChange={(val) => update({ selfInsurancePremium: val })}
                placeholder="25000"
                subtext="Capped at ₹25,000 (or ₹50,000 if you are a senior citizen)"
              />
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-gray-100 space-y-4">
          <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div>
              <p className="font-semibold text-gray-900">Parents</p>
              <p className="text-sm text-gray-500">Premium paid for parents</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={data.hasParentInsurance}
                onChange={(e) => update({ hasParentInsurance: e.target.checked })}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${data.hasParentInsurance ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${data.hasParentInsurance ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
          
          {data.hasParentInsurance && (
            <div className="space-y-4 reveal">
              <RadioGroup 
                label="Are any of your parents above 60?"
                options={[
                  { id: true, title: 'Yes' },
                  { id: false, title: 'No' }
                ]}
                value={data.parentsAbove60}
                onChange={(val) => update({ parentsAbove60: val })}
              />
              <NumberInput 
                label="Annual Premium Paid"
                value={data.parentInsurancePremium}
                onChange={(val) => update({ parentInsurancePremium: val })}
                placeholder="25000"
                subtext={data.parentsAbove60 ? "Capped at ₹50,000 for senior citizens" : "Capped at ₹25,000"}
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
