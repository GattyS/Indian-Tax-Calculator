import React from 'react';

export default function RadioGroup({ options, value, onChange, label }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`w-full flex items-start text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected 
                  ? 'border-blue-800 bg-blue-50/50 shadow-sm' 
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${isSelected ? 'text-blue-950' : 'text-gray-900'}`}>
                    {opt.title}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-blue-800' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-blue-800 rounded-full" />}
                  </div>
                </div>
                {opt.description && (
                  <p className={`text-sm pr-6 ${isSelected ? 'text-blue-900' : 'text-gray-500'}`}>
                    {opt.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
