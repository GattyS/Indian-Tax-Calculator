import React from 'react';
import NumberInput from './NumberInput';

export default function FrequencyInput({
  label,
  value,
  onChange,
  frequency,
  onFrequencyChange,
  subtext,
  error
}) {
  return (
    <div className={`w-full bg-white p-5 rounded-2xl border-2 transition-colors ${error ? 'border-red-100' : 'border-gray-100'} shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1">
          <NumberInput 
            label={label}
            value={value}
            onChange={onChange}
            isValid={value && Number(value) > 0}
            subtext={subtext}
            error={error}
          />
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1 shrink-0 h-12 sm:mt-[28px]">
          <button
            type="button"
            onClick={() => onFrequencyChange('monthly')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              frequency === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onFrequencyChange('annual')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              frequency === 'annual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Annual
          </button>
        </div>
      </div>
    </div>
  );
}
