import React, { useState } from 'react';
import NumberInput from '../shared/NumberInput';
import ConfusedLink from '../shared/ConfusedLink';
import CommonQuestions from '../shared/CommonQuestions';

export default function S05_SalaryComponents({ data, update, goNext, goBack }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const faqs = [
    {
      question: "What is HRA (House Rent Allowance)?",
      answer: "HRA is an allowance your employer pays for your housing. If you pay rent, part of your HRA can be claimed as tax-exempt under the Old Regime. If you have HRA in your payslip, toggle this on."
    },
    {
      question: "What is Professional Tax?",
      answer: "Professional tax is a small tax levied by some state governments, usually ₹200/month (₹2,500/year). Check your payslip for 'Prof Tax' or 'PT'."
    },
    {
      question: "What is Employer NPS?",
      answer: "This is when your employer contributes directly to your National Pension Scheme account (Section 80CCD(2)). It's available in both Old and New regimes, and is capped at 10% of your basic salary."
    },
    {
      question: "Does HRA exemption apply in the New Regime?",
      answer: "No. HRA exemption is only available under the Old Regime. Under the New Regime, you cannot claim it."
    }
  ];

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-2 px-1">
        <h2 className="text-2xl font-bold text-gray-900">Allowances & Deductions</h2>
        <ConfusedLink onClick={() => setShowQuestions(!showQuestions)} />
      </div>

      <div className="space-y-4">
        {/* HRA included in salary? */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-semibold text-gray-900">Do you receive HRA?</p>
              <p className="text-sm text-gray-500">House Rent Allowance</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={data.hasHRA}
                onChange={(e) => update({ hasHRA: e.target.checked })}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${data.hasHRA ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${data.hasHRA ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
        </div>

        {/* Professional Tax */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-semibold text-gray-900">Professional Tax</p>
              <p className="text-sm text-gray-500">Deducted from your salary</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={data.hasProfTax}
                onChange={(e) => update({ hasProfTax: e.target.checked })}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${data.hasProfTax ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${data.hasProfTax ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
          
          {data.hasProfTax && (
            <div className="pt-4 border-t border-gray-100 reveal">
              <NumberInput 
                label="Annual Professional Tax"
                value={data.professionalTax}
                onChange={(val) => update({ professionalTax: val })}
                placeholder="2500"
                subtext="Usually capped at ₹2,500 per year"
              />
            </div>
          )}
        </div>

        {/* Employer NPS */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-semibold text-gray-900">Employer NPS Contribution</p>
              <p className="text-sm text-gray-500">Section 80CCD(2)</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={data.hasEmployerNPS}
                onChange={(e) => update({ hasEmployerNPS: e.target.checked })}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${data.hasEmployerNPS ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${data.hasEmployerNPS ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
          
          {data.hasEmployerNPS && (
            <div className="pt-4 border-t border-gray-100 reveal">
              <NumberInput 
                label="Annual Employer NPS"
                value={data.employerNPS}
                onChange={(val) => update({ employerNPS: val })}
                placeholder="50000"
                subtext="Added to gross salary, then fully deduced under 80CCD(2)"
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
