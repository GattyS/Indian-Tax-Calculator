import React from 'react';

export default function NumberInput({ 
  label, 
  value, 
  onChange, 
  placeholder = "0",
  subtext,
  isValid,
  error
}) {
  const handleChange = (e) => {
    // Remove non-numeric characters
    const val = e.target.value.replace(/[^0-9]/g, '');
    onChange(val);
  };

  // Format to Indian Rupees format
  const formatRupees = (val) => {
    if (!val) return '';
    const num = Number(val);
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const displayValue = formatRupees(value);
  const showValid = isValid && !error && value && Number(value) > 0;

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-500 font-medium text-lg">₹</span>
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-9 pr-10 py-3.5 rounded-xl border-2 ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' :
            showValid ? 'border-green-400 focus:border-green-500 focus:ring-green-500/20' : 
            'border-gray-200 focus:border-blue-700 focus:ring-blue-700/20'
          } outline-none transition-all text-gray-900 font-semibold text-lg`}
        />
        {showValid && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>}
      {subtext && !error && <p className="mt-1.5 text-sm text-gray-500">{subtext}</p>}
    </div>
  );
}
