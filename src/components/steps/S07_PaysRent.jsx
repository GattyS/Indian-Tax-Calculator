import React from 'react';
import RadioGroup from '../shared/RadioGroup';

export default function S07_PaysRent({ data, update, goNext, goBack }) {
  const options = [
    { id: true, title: 'Yes, I pay rent', description: 'Can claim HRA exemption or Section 80GG' },
    { id: false, title: 'No, I don\'t pay rent', description: 'Living in own house or rent-free' }
  ];

  const handleNext = () => {
    if (data.paysRent !== null) goNext();
  };

  return (
    <div className="card-enter max-w-xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Do you pay rent?</h2>
        <p className="text-gray-500 mb-8">Rent paid can significantly reduce your tax in the old regime.</p>

        <RadioGroup 
          options={options}
          value={data.paysRent}
          onChange={(val) => update({ paysRent: val })}
        />

        <div className="mt-8 flex gap-4">
          <button onClick={goBack} className="px-6 py-3.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
            Back
          </button>
          <button 
            onClick={handleNext}
            disabled={data.paysRent === null}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold shadow-md transition-all ${
              data.paysRent !== null 
                ? 'bg-gradient-to-r from-blue-800 to-teal-600 text-white hover:-translate-y-0.5' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
