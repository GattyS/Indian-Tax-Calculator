import React from 'react';
import { computeTax } from '../../lib/taxEngine';
import { formatCurrency } from '../../lib/utils';

export default function TaxPreviewPanel({ data }) {
  const result = computeTax(data);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl reveal">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>⚡️</span> Live Preview
      </h3>

      <div className="space-y-6">
        {/* Gross Income */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <span className="text-gray-600 font-medium">Gross Income</span>
          <span className="text-xl font-bold text-gray-900">{formatCurrency(result.grossIncome)}</span>
        </div>

        {/* Comparison Table */}
        <div className="grid grid-cols-2 gap-4">
          {/* New Regime Column */}
          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg tracking-wider">
              DEFAULT
            </div>
            <h4 className="text-sm font-bold text-blue-950 mb-3">New Regime</h4>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Std. Ded.</span>
                <span className="font-medium text-gray-700">-{formatCurrency(result.new.standardDeduction)}</span>
              </div>
              {result.new.employerNPSDeduction > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Emp NPS</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.new.employerNPSDeduction)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs pt-1 border-t border-blue-100">
                <span className="text-gray-600 font-semibold">Taxable</span>
                <span className="font-bold text-gray-900">{formatCurrency(result.new.netTaxable)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-blue-200/50">
              <span className="block text-xs text-blue-800 font-medium mb-1">Total Tax</span>
              <span className="text-xl font-bold text-blue-950">{formatCurrency(result.new.totalTax)}</span>
            </div>
          </div>

          {/* Old Regime Column */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <h4 className="text-sm font-bold text-gray-600 mb-3">Old Regime</h4>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Std. Ded.</span>
                <span className="font-medium text-gray-700">-{formatCurrency(result.old.standardDeduction)}</span>
              </div>
              {result.old.professionalTax > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Prof Tax</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.professionalTax)}</span>
                </div>
              )}
              {result.old.employerNPSDeduction > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Emp NPS</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.employerNPSDeduction)}</span>
                </div>
              )}
              {result.old.hraExemption > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">HRA/Rent</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.hraExemption)}</span>
                </div>
              )}
              {result.old.deduction24b > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Home Loan Int</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.deduction24b)}</span>
                </div>
              )}
              {result.old.deduction80C > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">80C Inv.</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.deduction80C)}</span>
                </div>
              )}
              {result.old.deduction80CCD1B > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">NPS (80CCD)</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.deduction80CCD1B)}</span>
                </div>
              )}
              {result.old.deduction80D > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">80D Health</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.deduction80D)}</span>
                </div>
              )}
              {result.old.interestDeduction > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Interest</span>
                  <span className="font-medium text-gray-700">-{formatCurrency(result.old.interestDeduction)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs pt-1 border-t border-gray-200">
                <span className="text-gray-600 font-semibold">Taxable</span>
                <span className="font-bold text-gray-900">{formatCurrency(result.old.netTaxable)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <span className="block text-xs text-gray-500 font-medium mb-1">Total Tax</span>
              <span className="text-xl font-bold text-gray-900">{formatCurrency(result.old.totalTax)}</span>
            </div>
          </div>
        </div>

        {/* Suggestion */}
        <div className="mt-4">
          <div className="text-sm font-medium rounded-xl w-full border overflow-hidden">
            {result.new.totalTax <= result.old.totalTax ? (
              <div className="text-green-700 bg-green-50 border-green-100 text-center py-2.5 px-4">
                New Regime saves {formatCurrency(result.old.totalTax - result.new.totalTax)} 🎉
              </div>
            ) : (
              <div className="text-blue-800 bg-blue-50 border-blue-100 text-center py-2.5 px-4">
                Old Regime saves {formatCurrency(result.new.totalTax - result.old.totalTax)} ✨
              </div>
            )}
          </div>
        </div>

        {/* Surcharge Warning */}
        {result.grossIncome > 5000000 && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-800 font-semibold">⚠️ Surcharge may apply</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Income above ₹50L attracts a surcharge. This preview shows base tax only. Consult a CA for final figures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
