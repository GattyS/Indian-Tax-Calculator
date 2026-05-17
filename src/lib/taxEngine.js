import { TAX_CONSTANTS } from './constants';

export const calculateGrossIncome = (data) => {
  const basic = Number(data.basicSalary) || 0;
  const basicFreq = data.basicSalaryFreq || 'monthly';
  const annualBasic = basicFreq === 'monthly' ? basic * 12 : basic;

  const takeHome = Number(data.takeHomeSalary) || 0;
  const takeHomeFreq = data.takeHomeSalaryFreq || 'monthly';
  const annualTakeHome = takeHomeFreq === 'monthly' ? takeHome * 12 : takeHome;

  // Add Employer NPS to gross income (it gets deducted later under 80CCD(2))
  const employerNPS = data.hasEmployerNPS ? (Number(data.employerNPS) || 0) : 0;
  
  // Add other income (Savings + FD)
  const savingsInterest = Number(data.savingsInterest) || 0;
  const fdInterest = Number(data.fdInterest) || 0;
  const otherIncome = savingsInterest + fdInterest;

  // Gross income includes the salary plus employer NPS plus other income
  return Math.max(annualTakeHome, annualBasic) + employerNPS + otherIncome;
};

export const calculateHRAExemption = (data) => {
  if (!data.paysRent) return 0;
  
  const basic = Number(data.basicSalary) || 0;
  const annualBasic = (data.basicSalaryFreq === 'monthly' ? basic * 12 : basic) || 0;
  
  const monthlyRent = Number(data.monthlyRent) || 0;
  const annualRent = monthlyRent * 12;

  if (data.hasHRA) {
    const monthlyHRA = Number(data.hraMonthly) || 0;
    const annualHRA = monthlyHRA * 12;

    const condition1 = annualHRA;
    const condition2 = Math.max(0, annualRent - (0.10 * annualBasic));
    const condition3 = data.cityType === 'metro' ? (0.50 * annualBasic) : (0.40 * annualBasic);

    return Math.min(condition1, condition2, condition3);
  } else {
    // 80GG Calculation for those without HRA but paying rent
    const condition1 = 60000; // 5000 per month
    const condition2 = Math.max(0, annualRent - (0.10 * annualBasic));
    const condition3 = 0.25 * annualBasic;
    return Math.min(condition1, condition2, condition3);
  }
};

export const applySlabs = (income, slabs) => {
  let tax = 0;
  let previousLimit = 0;
  let breakdown = [];

  for (const slab of slabs) {
    if (income > previousLimit) {
      const taxableInThisSlab = Math.min(income - previousLimit, slab.limit - previousLimit);
      const taxForSlab = taxableInThisSlab * slab.rate;
      
      if (slab.rate > 0 && taxableInThisSlab > 0) {
        breakdown.push({
          rate: slab.rate * 100,
          amount: taxForSlab
        });
      }
      tax += taxForSlab;
    } else {
      break;
    }
    previousLimit = slab.limit;
  }

  return { tax, breakdown };
};

export const computeTax = (data) => {
  const grossIncome = calculateGrossIncome(data);
  const ageGroup = data.ageGroup || 'below60';

  // Old Regime Computation
  const oldStandardDeduction = Math.min(grossIncome, TAX_CONSTANTS.STANDARD_DEDUCTION.old);
  const professionalTax = data.hasProfTax ? Math.min(2500, Number(data.professionalTax) || 0) : 0;
  
  // Employer NPS is allowed as deduction under both regimes under Section 80CCD(2)
  // Capped at 14% of basic for government, 10% for others. Assuming 10% for simplicity here,
  // but if user provides exact basic, we cap it.
  const basic = Number(data.basicSalary) || 0;
  const annualBasic = (data.basicSalaryFreq === 'monthly' ? basic * 12 : basic) || grossIncome;
  const employerNPS = data.hasEmployerNPS ? (Number(data.employerNPS) || 0) : 0;
  const employerNPSDeduction = Math.min(employerNPS, annualBasic * 0.10);

  // Sec 80TTA: Savings interest deduction up to 10k (Old Regime only, below 60)
  // Sec 80TTB: Savings + FD interest up to 50k (Old Regime only, senior citizens)
  const savingsInterest = Number(data.savingsInterest) || 0;
  const fdInterest = Number(data.fdInterest) || 0;
  const oldInterestDeduction = (ageGroup === 'senior' || ageGroup === 'superSenior') 
    ? Math.min(50000, savingsInterest + fdInterest) 
    : Math.min(10000, savingsInterest);

  // Housing Exemption (HRA or 80GG)
  const hraExemption = calculateHRAExemption(data);

  // 80C Deductions
  let total80C = 0;
  if (data.investments80C) {
    Object.values(data.investments80C).forEach(val => {
      total80C += Number(val) || 0;
    });
  }
  const deduction80C = Math.min(150000, total80C);

  // 80CCD(1B) Personal NPS
  const personalNPS = data.hasPersonalNPS ? (Number(data.personalNPS) || 0) : 0;
  const deduction80CCD1B = Math.min(50000, personalNPS);

  // 80D Health Insurance
  const selfPremium = data.hasSelfInsurance ? (Number(data.selfInsurancePremium) || 0) : 0;
  const selfLimit = (ageGroup === 'senior' || ageGroup === 'superSenior') ? 50000 : 25000;
  const selfDeduction = Math.min(selfLimit, selfPremium);

  const parentPremium = data.hasParentInsurance ? (Number(data.parentInsurancePremium) || 0) : 0;
  const parentLimit = data.parentsAbove60 ? 50000 : 25000;
  const parentDeduction = Math.min(parentLimit, parentPremium);
  
  const deduction80D = selfDeduction + parentDeduction;

  // 24(b) Home Loan Interest
  const homeLoanInterest = data.hasHomeLoan ? (Number(data.homeLoanInterest) || 0) : 0;
  const deduction24b = Math.min(200000, homeLoanInterest);

  const oldTotalDeductions = oldStandardDeduction + professionalTax + employerNPSDeduction + oldInterestDeduction + hraExemption + deduction80C + deduction80CCD1B + deduction80D + deduction24b;
  let oldNetTaxable = Math.max(0, grossIncome - oldTotalDeductions);
  
  const oldSlabs = TAX_CONSTANTS.SLABS.old[ageGroup] || TAX_CONSTANTS.SLABS.old.below60;
  const oldTaxResult = applySlabs(oldNetTaxable, oldSlabs);
  let oldTax = oldTaxResult.tax;

  if (oldNetTaxable <= TAX_CONSTANTS.REBATE_87A.old.limit) {
    oldTax = Math.max(0, oldTax - TAX_CONSTANTS.REBATE_87A.old.amount);
  }

  const oldCess = oldTax * TAX_CONSTANTS.CESS_RATE;
  const oldTotalTax = oldTax + oldCess;

  // New Regime Computation
  const newStandardDeduction = Math.min(grossIncome, TAX_CONSTANTS.STANDARD_DEDUCTION.new);
  
  // New Regime allows Standard Deduction and Employer NPS (80CCD(2)). No Prof Tax or 80TTA.
  const newTotalDeductions = newStandardDeduction + employerNPSDeduction;
  let newNetTaxable = Math.max(0, grossIncome - newTotalDeductions);

  const newTaxResult = applySlabs(newNetTaxable, TAX_CONSTANTS.SLABS.new);
  let newTax = newTaxResult.tax;

  if (newNetTaxable <= TAX_CONSTANTS.REBATE_87A.new.limit) {
    newTax = Math.max(0, newTax - TAX_CONSTANTS.REBATE_87A.new.amount);
  }

  // Marginal Relief for New Regime:
  // Tax on exactly ₹12L = ₹60k (after rebate = ₹0).
  // For net income just above ₹12L, total tax should not exceed (income - ₹12L).
  // Break-even: 60,000 + 15%×x = x → x = 70,588 → upper bound ≈ ₹12,70,588
  const newRebaseLimit = TAX_CONSTANTS.REBATE_87A.new.limit;
  if (newNetTaxable > newRebaseLimit && newNetTaxable <= 1275000) {
    const incomeExceedingLimit = newNetTaxable - newRebaseLimit;
    if (newTax > incomeExceedingLimit) {
       newTax = incomeExceedingLimit; // Marginal relief
    }
  }

  const newCess = newTax * TAX_CONSTANTS.CESS_RATE;
  const newTotalTax = newTax + newCess;

  const employerTDS = Number(data.employerTDS) || 0;
  const otherTDS = Number(data.otherTDS) || 0;
  const totalTDS = employerTDS + otherTDS;

  return {
    grossIncome,
    totalTDS,
    old: {
      standardDeduction: oldStandardDeduction,
      professionalTax,
      employerNPSDeduction,
      interestDeduction: oldInterestDeduction,
      hraExemption,
      deduction80C,
      deduction80CCD1B,
      deduction80D,
      deduction24b,
      totalDeductions: oldTotalDeductions,
      netTaxable: oldNetTaxable,
      taxBeforeCess: oldTax,
      cess: oldCess,
      totalTax: oldTotalTax,
      breakdown: oldTaxResult.breakdown
    },
    new: {
      standardDeduction: newStandardDeduction,
      employerNPSDeduction,
      totalDeductions: newTotalDeductions,
      netTaxable: newNetTaxable,
      taxBeforeCess: newTax,
      cess: newCess,
      totalTax: newTotalTax,
      breakdown: newTaxResult.breakdown
    }
  };
};
