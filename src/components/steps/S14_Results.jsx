import React from 'react';
import { computeTax } from '../../lib/taxEngine';
import { formatCurrency } from '../../lib/utils';

export default function S12_Summary({ data, goBack, reset }) {
  const taxResult = computeTax(data);
  const diff = taxResult.old.totalTax - taxResult.new.totalTax;
  
  const totalTDS = taxResult.totalTDS || 0;
  const taxDueOld = taxResult.old.totalTax - totalTDS;
  const taxDueNew = taxResult.new.totalTax - totalTDS;

  let recommendation = '';
  let savings = 0;
  let recommendedRegime = '';

  if (diff > 0) {
    recommendation = 'New Regime';
    recommendedRegime = 'new';
    savings = diff;
  } else if (diff < 0) {
    recommendation = 'Old Regime';
    recommendedRegime = 'old';
    savings = Math.abs(diff);
  } else {
    recommendation = 'Either Regime';
    recommendedRegime = 'equal';
    savings = 0;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card-enter max-w-3xl mx-auto space-y-6 pb-12 pt-8 print:pt-0">
      <div className="text-center mb-8 print:mb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Tax Clarity is Here!</h2>
        <p className="text-gray-500 mt-2">Based on your inputs for FY 2025-26</p>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-teal-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden text-center print:bg-none print:text-black print:border print:border-gray-300">
        <div className="relative z-10">
          <p className="text-blue-100 font-medium mb-2 print:text-gray-600">You should choose the</p>
          <h3 className="text-5xl font-black mb-4 tracking-tight">{recommendation}</h3>
          
          {savings > 0 && (
            <p className="text-lg font-medium text-teal-100 bg-white/20 inline-block px-4 py-2 rounded-full print:text-black print:bg-gray-100">
              Saves you {formatCurrency(savings)} compared to the other regime
            </p>
          )}
          {savings === 0 && (
            <p className="text-lg font-medium text-teal-100 bg-white/20 inline-block px-4 py-2 rounded-full print:text-black print:bg-gray-100">
              Your tax liability is exactly the same under both regimes.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 print:p-0 print:border-none print:shadow-none">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Detailed Comparison</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-3 px-4 font-semibold text-gray-500 w-1/3">Component</th>
                <th className={`py-3 px-4 font-bold text-right w-1/3 ${recommendedRegime === 'old' ? 'text-blue-800 bg-blue-50/50 rounded-t-xl' : 'text-gray-900'}`}>Old Regime</th>
                <th className={`py-3 px-4 font-bold text-right w-1/3 ${recommendedRegime === 'new' ? 'text-blue-800 bg-blue-50/50 rounded-t-xl' : 'text-gray-900'}`}>New Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm md:text-base">
              {/* --- 1. INCOME --- */}
              <tr className="bg-gray-50/50">
                <td colSpan="3" className="py-2 px-4 font-bold text-gray-500 text-xs tracking-wider uppercase">1. Income</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-600 pl-8">Gross Total Income</td>
                <td className={`py-3 px-4 text-right font-medium ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>{formatCurrency(taxResult.grossIncome)}</td>
                <td className={`py-3 px-4 text-right font-medium ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>{formatCurrency(taxResult.grossIncome)}</td>
              </tr>

              {/* --- 2. DEDUCTIONS --- */}
              <tr className="bg-gray-50/50">
                <td colSpan="3" className="py-2 px-4 font-bold text-gray-500 text-xs tracking-wider uppercase">2. Exemptions & Deductions</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-gray-600 pl-8">Standard Deduction</td>
                <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.standardDeduction)}</td>
                <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.standardDeduction)}</td>
              </tr>
              
              {(taxResult.old.hraExemption > 0 || taxResult.new.hraExemption > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">HRA Exemption / 80GG</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.hraExemption || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.hraExemption || 0)}</td>
                </tr>
              )}
              
              {(taxResult.old.deduction80C > 0 || taxResult.new.deduction80C > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">Section 80C (EPF, PPF, etc.)</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.deduction80C || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.deduction80C || 0)}</td>
                </tr>
              )}

              {(taxResult.old.deduction80CCD1B > 0 || taxResult.new.deduction80CCD1B > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">Personal NPS (80CCD(1B))</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.deduction80CCD1B || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.deduction80CCD1B || 0)}</td>
                </tr>
              )}

              {(taxResult.old.deduction80D > 0 || taxResult.new.deduction80D > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">Health Insurance (80D)</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.deduction80D || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.deduction80D || 0)}</td>
                </tr>
              )}

              {(taxResult.old.deduction24b > 0 || taxResult.new.deduction24b > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">Home Loan Interest (24b)</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.deduction24b || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.deduction24b || 0)}</td>
                </tr>
              )}

              {(taxResult.old.professionalTax > 0 || taxResult.new.professionalTax > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">Professional Tax</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.professionalTax || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.professionalTax || 0)}</td>
                </tr>
              )}

              {(taxResult.old.employerNPSDeduction > 0 || taxResult.new.employerNPSDeduction > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">Employer NPS (80CCD(2))</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.employerNPSDeduction || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.employerNPSDeduction || 0)}</td>
                </tr>
              )}
              
              {(taxResult.old.interestDeduction > 0 || taxResult.new.interestDeduction > 0) && (
                <tr>
                  <td className="py-2 px-4 text-gray-600 pl-8">Interest Deduction (80TTA/B)</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.old.interestDeduction || 0)}</td>
                  <td className={`py-2 px-4 text-right text-red-500 ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>-{formatCurrency(taxResult.new.interestDeduction || 0)}</td>
                </tr>
              )}

              <tr className="border-t border-gray-100">
                <td className="py-3 px-4 text-gray-900 font-semibold pl-8">Total Deductions</td>
                <td className={`py-3 px-4 text-right text-red-600 font-bold ${recommendedRegime === 'old' ? 'bg-blue-50/50' : ''}`}>-{formatCurrency(taxResult.old.totalDeductions)}</td>
                <td className={`py-3 px-4 text-right text-red-600 font-bold ${recommendedRegime === 'new' ? 'bg-blue-50/50' : ''}`}>-{formatCurrency(taxResult.new.totalDeductions)}</td>
              </tr>

              {/* --- 3. TAXABLE INCOME --- */}
              <tr className="bg-gray-50/50">
                <td colSpan="3" className="py-2 px-4 font-bold text-gray-500 text-xs tracking-wider uppercase">3. Net Taxable Income</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-900 font-bold pl-8">Taxable Income</td>
                <td className={`py-4 px-4 text-right font-black text-lg text-gray-900 ${recommendedRegime === 'old' ? 'bg-blue-50/50' : ''}`}>{formatCurrency(taxResult.old.netTaxable)}</td>
                <td className={`py-4 px-4 text-right font-black text-lg text-gray-900 ${recommendedRegime === 'new' ? 'bg-blue-50/50' : ''}`}>{formatCurrency(taxResult.new.netTaxable)}</td>
              </tr>

              {/* --- 4. TAX COMPUTATION --- */}
              <tr className="bg-gray-50/50">
                <td colSpan="3" className="py-2 px-4 font-bold text-gray-500 text-xs tracking-wider uppercase">4. Tax Computation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-600 pl-8 align-top">
                  <span className="block mb-2">Tax on Slabs</span>
                  <span className="text-xs text-gray-400">Hover or tap numbers to see breakdown</span>
                </td>
                <td className={`py-3 px-4 text-right align-top ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>
                  <div className="font-medium mb-2">{formatCurrency(taxResult.old.taxBeforeCess)}</div>
                  {taxResult.old.breakdown && taxResult.old.breakdown.length > 0 && (
                    <div className="text-xs text-gray-500 space-y-1">
                      {taxResult.old.breakdown.map((b, i) => (
                        <div key={i} className="flex justify-end gap-3">
                          <span className="text-gray-400">@{b.rate}%</span>
                          <span>{formatCurrency(b.amount)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className={`py-3 px-4 text-right align-top ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>
                  <div className="font-medium mb-2">{formatCurrency(taxResult.new.taxBeforeCess)}</div>
                  {taxResult.new.breakdown && taxResult.new.breakdown.length > 0 && (
                    <div className="text-xs text-gray-500 space-y-1">
                      {taxResult.new.breakdown.map((b, i) => (
                        <div key={i} className="flex justify-end gap-3">
                          <span className="text-gray-400">@{b.rate}%</span>
                          <span>{formatCurrency(b.amount)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-600 pl-8">Health & Edu Cess (4%)</td>
                <td className={`py-3 px-4 text-right font-medium ${recommendedRegime === 'old' ? 'bg-blue-50/30' : ''}`}>{formatCurrency(taxResult.old.cess)}</td>
                <td className={`py-3 px-4 text-right font-medium ${recommendedRegime === 'new' ? 'bg-blue-50/30' : ''}`}>{formatCurrency(taxResult.new.cess)}</td>
              </tr>
              
              <tr className="bg-gray-100/50 border-t-2 border-gray-200">
                <td className="py-4 px-4 text-gray-900 font-bold pl-8">Total Tax Computed</td>
                <td className={`py-4 px-4 text-right font-bold text-gray-900 ${recommendedRegime === 'old' ? 'bg-blue-100/50' : ''}`}>{formatCurrency(taxResult.old.totalTax)}</td>
                <td className={`py-4 px-4 text-right font-bold text-gray-900 ${recommendedRegime === 'new' ? 'bg-blue-100/50' : ''}`}>{formatCurrency(taxResult.new.totalTax)}</td>
              </tr>

              {totalTDS > 0 && (
                <tr>
                  <td className="py-4 px-4 text-green-600 font-semibold pl-8">Minus: TDS Already Paid</td>
                  <td className={`py-4 px-4 text-right text-green-600 font-semibold ${recommendedRegime === 'old' ? 'bg-blue-50/50' : ''}`}>-{formatCurrency(totalTDS)}</td>
                  <td className={`py-4 px-4 text-right text-green-600 font-semibold ${recommendedRegime === 'new' ? 'bg-blue-50/50' : ''}`}>-{formatCurrency(totalTDS)}</td>
                </tr>
              )}
              
              <tr className="bg-gray-900 text-white shadow-inner">
                <td className="py-6 px-4 font-bold rounded-bl-xl pl-8 text-lg">
                  Final Balance {taxDueNew < 0 || taxDueOld < 0 ? '(Refund)' : '(Due)'}
                </td>
                <td className={`py-6 px-4 text-right font-black text-xl ${recommendedRegime === 'old' ? 'text-blue-200 bg-blue-950/50' : ''}`}>
                  {taxDueOld < 0 ? `${formatCurrency(Math.abs(taxDueOld))} Refund` : `${formatCurrency(taxDueOld)} Due`}
                </td>
                <td className={`py-6 px-4 text-right font-black text-xl ${recommendedRegime === 'new' ? 'text-blue-200 bg-blue-950/50 rounded-br-xl' : 'rounded-br-xl'}`}>
                  {taxDueNew < 0 ? `${formatCurrency(Math.abs(taxDueNew))} Refund` : `${formatCurrency(taxDueNew)} Due`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-4 print:hidden pt-4">
        <button onClick={goBack} className="px-6 py-4 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          Go Back
        </button>
        <button onClick={handlePrint} className="flex-1 py-4 px-6 rounded-xl font-bold border-2 border-blue-800 text-blue-800 hover:bg-blue-50 transition-colors text-center">
          Save as PDF / Print
        </button>
        <button onClick={reset} className="flex-1 py-4 px-6 rounded-xl font-bold bg-blue-800 text-white hover:bg-blue-900 transition-colors shadow-md text-center">
          Start Over
        </button>
      </div>
    </div>
  );
}
