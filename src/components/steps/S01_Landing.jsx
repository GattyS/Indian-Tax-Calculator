import React from 'react';

export default function S01_Landing({ goNext }) {
  return (
    <div className="flex-1 w-full flex flex-col justify-center py-12 md:py-20 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-40 -left-40 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col items-center text-center relative z-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-900 text-sm font-semibold tracking-wide shadow-sm">
          Updated for FY 2025-26 🇮🇳
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          Calculate your tax <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            with absolute clarity
          </span>
        </h1>
        
        <p className="text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
          The new Indian tax regime is confusing. We make it simple. Enter your details and we'll show you exactly how much you'll pay and how to save.
        </p>
        
        <button 
          onClick={goNext}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gray-900 rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <span className="text-lg">Start Free Calculation</span>
          <svg className="w-6 h-6 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>

        {/* Trust strip */}
        <div className="mt-20 pt-10 border-t border-gray-100 w-full">
          <p className="text-xs font-bold text-gray-400 mb-8 tracking-wider">WHY PEOPLE TRUST TAXCLARITY</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-sm border border-green-100">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Private</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Your financial data never leaves your browser. No servers, no tracking.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-sm border border-blue-100">⚡️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-sm text-gray-500 leading-relaxed">See your tax liability update instantly as you type each number.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-sm border border-teal-100">🧠</div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Logic</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Built-in rules handle complex exemptions like HRA and Chapter VI-A automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
