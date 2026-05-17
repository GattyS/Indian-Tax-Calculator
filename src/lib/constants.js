export const TAX_CONSTANTS = {
  STANDARD_DEDUCTION: {
    old: 50000,
    new: 75000, // Updated for FY 2025-26
  },
  CESS_RATE: 0.04,
  REBATE_87A: {
    old: { limit: 500000, amount: 12500 },
    new: { limit: 1200000, amount: 60000 }, // Budget 2025: zero tax up to ₹12L net income
  },
  SLABS: {
    old: {
      below60: [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 1000000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 },
      ],
      senior: [
        { limit: 300000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 1000000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 },
      ],
      superSenior: [
        { limit: 500000, rate: 0 },
        { limit: 1000000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 },
      ]
    },
    new: [
      // Budget 2025 revised slabs for New Regime (FY 2025-26)
      { limit: 400000,   rate: 0    },
      { limit: 800000,   rate: 0.05 },
      { limit: 1200000,  rate: 0.10 },
      { limit: 1600000,  rate: 0.15 },
      { limit: 2000000,  rate: 0.20 },
      { limit: 2400000,  rate: 0.25 },
      { limit: Infinity, rate: 0.30 },
    ]
  }
};
