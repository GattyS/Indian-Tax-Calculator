import React, { useEffect, useState } from 'react';

export default function S13_Calculating({ goNext }) {
  const [step, setStep] = useState(0);

  const steps = [
    "Analyzing your income details...",
    "Applying old regime deductions...",
    "Applying new regime slabs...",
    "Finding the best outcome..."
  ];

  useEffect(() => {
    // 3 seconds total. 4 steps = ~750ms each
    const timer1 = setTimeout(() => setStep(1), 700);
    const timer2 = setTimeout(() => setStep(2), 1500);
    const timer3 = setTimeout(() => setStep(3), 2200);
    const finish = setTimeout(() => goNext(), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(finish);
    };
  }, [goNext]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] card-enter">
      <div className="relative w-24 h-24 mb-8">
        {/* Animated spinner circles */}
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-800 rounded-full border-t-transparent animate-[spin_1s_linear_infinite]"></div>
        <div className="absolute inset-2 border-4 border-teal-200 rounded-full"></div>
        <div className="absolute inset-2 border-4 border-teal-500 rounded-full border-b-transparent animate-[spin_1.5s_linear_infinite]"></div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculating your taxes</h2>

      <div className="space-y-3 w-72">
        {steps.map((text, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-3 transition-all duration-500 ${
              i <= step ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              i < step ? 'bg-green-500 text-white' : i === step ? 'bg-blue-100 text-blue-800 animate-pulse' : 'bg-gray-100'
            }`}>
              {i < step && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {i === step && (
                <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
              )}
            </div>
            <span className={`text-sm ${i < step ? 'text-gray-500 line-through' : i === step ? 'text-blue-900 font-medium' : 'text-gray-400'}`}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
