import React, { useState } from 'react';
import S01_Landing from './components/steps/S01_Landing.jsx';
import S02_FinancialYear from './components/steps/S02_FinancialYear.jsx';
import S03_AgeGroup from './components/steps/S03_AgeGroup.jsx';
import S04_SalaryDetails from './components/steps/S04_SalaryDetails.jsx';
import S05_SalaryComponents from './components/steps/S05_SalaryComponents.jsx';
import S06_OtherIncome from './components/steps/S06_OtherIncome.jsx';
import S07_PaysRent from './components/steps/S07_PaysRent.jsx';
import S08_RentDetails from './components/steps/S08_RentDetails.jsx';
import S09_TaxSavingInvestments from './components/steps/S09_TaxSavingInvestments.jsx';
import S10_HealthInsurance from './components/steps/S10_HealthInsurance.jsx';
import S11_HomeLoan from './components/steps/S11_HomeLoan.jsx';
import S12_TDS from './components/steps/S12_TDS.jsx';
import S13_Calculating from './components/steps/S13_Calculating.jsx';
import S14_Results from './components/steps/S14_Results.jsx';
import StepWrapper from './components/layout/StepWrapper.jsx';
import TaxPreviewPanel from './components/layout/TaxPreviewPanel.jsx';

export const INITIAL_STATE = {
  fy: '2025-26',
  ageGroup: 'below60',         // Default age group
  basicSalary: '1200000',      // Default basic salary
  basicSalaryFreq: 'yearly',   // Default frequency
  takeHomeSalary: '',
  takeHomeSalaryFreq: 'monthly',
  hasBonus: null,              // boolean | null
  bonus: '',                   // annual figure (FrequencyInput handles conversion)
  hasHRA: false,
  hraMonthly: '',
  hasProfTax: false,
  professionalTax: '',         // annual, capped at 2500 in engine
  hasEmployerNPS: false,
  employerNPS: '',             // annual, capped at 14% of basic in engine
  hasOtherIncome: null,        // boolean | null
  fdInterest: '',
  savingsInterest: '',
  paysRent: null,              // boolean | null
  monthlyRent: '',
  cityType: null,              // 'metro' | 'nonMetro'
  hasHRAInSalary: null,        // boolean | null
  investments80C: {
    epf: '',
    lic: '',
    ppf: '',
    elss: '',
    tuition: '',
    homeLoanPrincipal: '',
    nsc: '',
  },
  has80CItems: [],             // array of selected 80C keys e.g. ['epf', 'ppf']
  hasPersonalNPS: null,        // boolean | null
  personalNPS: '',             // annual
  hasSelfInsurance: null,      // boolean | null
  selfInsurancePremium: '',    // annual
  hasParentInsurance: null,    // boolean | null
  parentInsurancePremium: '',  // annual
  parentsAbove60: null,        // boolean | null
  hasHomeLoan: null,           // boolean | null
  loanOwnership: null,         // 'own' | 'joint' | 'other'
  homeLoanInterest: '',        // annual
  hasTDS: null,                // boolean | null
  tdsDeducted: '',             // employer TDS for the year
  bankTDS: '',                 // bank TDS on FD interest
};

export default function App() {
  const [step, setStep] = useState(1);       // 1–14
  const [data, setData] = useState(INITIAL_STATE);
  const [results, setResults] = useState(null);

  function update(fields) { setData(prev => ({ ...prev, ...fields })); }
  function goNext() { setStep(s => s + 1); }
  function goBack() { setStep(s => Math.max(1, s - 1)); }
  function skipTo(targetStep) { setStep(targetStep); }
  function reset() { setData(INITIAL_STATE); setResults(null); setStep(1); }

  const PROGRESS_STEPS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];  // steps shown in progress
  const TOTAL_PROGRESS = 10;
  const progressStep = PROGRESS_STEPS.indexOf(step) + 1;
  const showProgress = PROGRESS_STEPS.includes(step);

  const sharedProps = { data, update, goNext, goBack, skipTo, step, progressStep, showProgress, TOTAL_PROGRESS, reset };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {step === 1 && <S01_Landing goNext={goNext} />}
      {step === 2 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S02_FinancialYear {...sharedProps} />
        </StepWrapper>
      )}
      {step === 3 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S03_AgeGroup {...sharedProps} />
        </StepWrapper>
      )}
      {step === 4 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S04_SalaryDetails {...sharedProps} />
        </StepWrapper>
      )}
      {step === 5 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S05_SalaryComponents {...sharedProps} />
        </StepWrapper>
      )}
      {step === 6 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S06_OtherIncome {...sharedProps} />
        </StepWrapper>
      )}
      {step === 7 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S07_PaysRent {...sharedProps} />
        </StepWrapper>
      )}
      {step === 8 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S08_RentDetails {...sharedProps} />
        </StepWrapper>
      )}
      {step === 9 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S09_TaxSavingInvestments {...sharedProps} />
        </StepWrapper>
      )}
      {step === 10 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S10_HealthInsurance {...sharedProps} />
        </StepWrapper>
      )}
      {step === 11 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S11_HomeLoan {...sharedProps} />
        </StepWrapper>
      )}
      {step === 12 && (
        <StepWrapper 
          currentStep={progressStep} 
          totalSteps={TOTAL_PROGRESS} 
          goBack={goBack} 
          onLogoClick={reset}
          rightPanel={<TaxPreviewPanel data={data} />}
        >
          <S12_TDS {...sharedProps} />
        </StepWrapper>
      )}
      {step === 13 && (
        <S13_Calculating goNext={goNext} />
      )}
      {step === 14 && (
        <S14_Results data={data} goBack={() => setStep(12)} reset={reset} />
      )}
    </div>
  );
}
