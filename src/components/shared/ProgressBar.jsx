import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  if (totalSteps <= 0) return null;
  
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div 
          key={i} 
          className={`h-2 rounded-full transition-all duration-300 ${
            i < currentStep ? 'bg-blue-800 w-6' : 'bg-gray-200 w-2'
          }`}
        />
      ))}
    </div>
  );
}
