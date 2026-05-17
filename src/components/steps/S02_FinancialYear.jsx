import React from 'react';

export default function S02_FinancialYear({ goNext }) {
  return (
    <div className="card-enter max-w-xl mx-auto">
      <div className="text-center p-10 bg-white rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Year</h2>
        <div className="p-6 bg-blue-50 border-2 border-blue-800 rounded-xl mb-8">
          <p className="text-lg font-semibold text-blue-950">FY 2025-26</p>
          <p className="text-sm text-blue-900 mt-2">Calculations are strictly for the new Indian Tax Regime</p>
        </div>
        <button 
          onClick={goNext}
          className="w-full bg-gradient-to-r from-blue-800 to-teal-600 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
