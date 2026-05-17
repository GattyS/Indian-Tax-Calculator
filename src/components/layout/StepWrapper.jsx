import React from 'react';
import ProgressBar from '../shared/ProgressBar.jsx';

export default function StepWrapper({ children, currentStep, totalSteps, goBack, onLogoClick, rightPanel }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {goBack ? (
              <button 
                onClick={goBack}
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </button>
            ) : (
              <div className="w-10 h-10" /> // Spacer
            )}
            <button 
              onClick={onLogoClick} 
              className="text-xl font-bold bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              TaxClarity
            </button>
          </div>
          
          {totalSteps > 0 && currentStep > 0 && (
            <div className="hidden sm:block">
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}

          {/* Right side element for balance */}
          <div className="w-[88px] flex justify-end">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              FY 2025-26
            </span>
          </div>
        </div>
        {/* Mobile progress bar below header */}
        {totalSteps > 0 && currentStep > 0 && (
          <div className="sm:hidden flex justify-center py-2 bg-white border-t border-gray-50">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col lg:flex-row gap-8">
        {/* Left Column (Form) */}
        <div className="flex-1 max-w-2xl w-full mx-auto">
          {children}
        </div>

        {/* Right Column (Live Preview Panel or Questions) */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="sticky top-24">
            {rightPanel || (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center text-gray-400">
                <p className="text-sm">Live Preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer / Trust Badges */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p className="flex items-center justify-center gap-2">
          <span>🔒</span> Your data is private and never leaves your browser
        </p>
      </footer>
    </div>
  );
}
