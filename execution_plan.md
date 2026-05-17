# Phased Execution Plan: Indian Tax Calculator FY 2025-26

This plan breaks down the development of the TaxClarity application into 10 distinct, bite-sized phases. Each phase is designed to be completed in a single session and results in a functional, runnable application that can be visually inspected and verified before moving on.

---

## Phase 1: Project Setup & Core State Foundation
**Goal:** Initialize the project, set up styling, and establish the global state and routing shell.

*   **Tasks:**
    *   Initialize a Vite + React project.
    *   Configure Tailwind CSS, PostCSS, and install the Inter font.
    *   Create the exact global state (`INITIAL_STATE`) and step navigation logic (1–14) inside `App.jsx`.
    *   Create placeholder components for S01 (Landing) and S02 (Financial Year) to prove the step navigation works.
*   **Verification:** The app loads a basic screen. Clicking "Next" transitions the state from Step 1 to Step 2 successfully without page reloads.

## Phase 2: Layout Shell & Shared UI Elements
**Goal:** Implement the persistent two-column layout, header, and progress tracking.

*   **Tasks:**
    *   Implement the `StepWrapper.jsx` to create the two-column layout with the sticky nav bar and trust badges.
    *   Implement `ProgressBar.jsx` (dot-based progress indicator).
    *   Build the `ConfusedLink.jsx` and `CommonQuestions.jsx` accordion components for help text.
    *   Integrate `StepWrapper` into `App.jsx` for the placeholder steps.
*   **Verification:** The app displays a polished header with a logo, back button, and a functional progress bar that updates as you navigate between steps. The layout structure is robust and responsive.

## Phase 3: Form Inputs & Initial Steps (S01–S04)
**Goal:** Build the primary input components and the initial user screens (Landing, Age, Salary).

*   **Tasks:**
    *   Create `NumberInput.jsx` (with formatting and green validation checkmarks) and `FrequencyInput.jsx` (monthly/annual toggle).
    *   Create the custom Radio Button and Checkbox styling patterns.
    *   Implement full `S01_Landing.jsx` (with hero graphics and trust strip).
    *   Implement `S02_FinancialYear.jsx`, `S03_AgeGroup.jsx`, and `S04_SalaryDetails.jsx` (with basic vs take-home validation).
*   **Verification:** You can start at a polished landing page, pick an age group, enter salary details, and the custom inputs correctly format rupees, validate, and convert monthly-to-annual figures.

## Phase 4: Tax Engine Core & Live Preview Panel
**Goal:** Implement the mathematical core and the right-side sticky live preview panel.

*   **Tasks:**
    *   Create `constants.js` (slabs, caps, deduction limits) and `utils.js` (formatting).
    *   Build `taxEngine.js` with foundational functions: `calculateGrossIncome`, `applySlabs`, and a basic `computeTax` that handles standard deduction but ignores other deductions for now.
    *   Implement the `TaxPreviewPanel.jsx` to consume the engine's output and render the live calculations and slab breakdowns.
*   **Verification:** As you type your salary in S04, the right-hand panel instantly updates, showing your gross income, standard deduction, and the calculated tax on slabs for both regimes.

## Phase 5: Salary Components & Other Income (S05–S06)
**Goal:** Allow users to input allowances, perquisites, and passive income.

*   **Tasks:**
    *   Implement `S05_SalaryComponents.jsx` (HRA receipt, Professional Tax, Employer NPS).
    *   Implement `S06_OtherIncome.jsx` (FD and Savings interest with yes/no toggles).
    *   Update `taxEngine.js` to process Section 16(iii), 80CCD(2), and add other income to the gross total.
    *   Update the `TaxPreviewPanel` to render these new line items.
*   **Verification:** Adding an FD interest amount or Employer NPS immediately reflects in the gross income and deductions section of the live preview panel.

## Phase 6: Housing & HRA Exemption (S07–S08)
**Goal:** Handle the complex HRA exemption logic based on rent paid.

*   **Tasks:**
    *   Implement `S07_PaysRent.jsx` and `S08_RentDetails.jsx` (monthly rent, metro/non-metro selection).
    *   Add the `calculateHRAExemption` logic to `taxEngine.js` (the 3-condition minimum rule).
    *   Update the old regime computation to subtract the computed HRA exemption.
*   **Verification:** Entering rent details for a metro city dynamically updates the HRA exemption line in the old regime column of the live preview panel, lowering the total tax.

## Phase 7: Tax Saving Investments (S09–S11)
**Goal:** Complete the deductions flow (80C, 80D, 24b).

*   **Tasks:**
    *   Implement `S09_TaxSavingInvestments.jsx` (80C list with running total bar, Personal NPS).
    *   Implement `S10_HealthInsurance.jsx` (80D logic with separate self/parent caps).
    *   Implement `S11_HomeLoan.jsx` (Section 24b).
    *   Finalize `taxEngine.js` to process all Section 80 and Section 24 deductions with their respective caps.
*   **Verification:** You can enter an EPF amount, health insurance premium, and home loan interest. The live preview correctly applies caps (e.g., stopping 80C at ₹1.5L) and shows the final comparison between regimes.

## Phase 8: TDS & Calculation Animation (S12–S13)
**Goal:** Capture tax already paid and create a smooth transition to the final results.

*   **Tasks:**
    *   Implement `S12_TDS.jsx` (Employer TDS and Bank TDS).
    *   Implement the `calculateTDSPosition` logic in the engine.
    *   Implement `S13_Calculating.jsx` (the 3-second animated spinner with sequentially completing steps).
*   **Verification:** Entering TDS amounts and clicking the green "Calculate My Tax" button transitions you to a polished loading screen that ticks through calculation steps before moving to the next state.

## Phase 9: Results Page (S14)
**Goal:** Build the comprehensive final report summarizing the recommendations.

*   **Tasks:**
    *   Implement the 5 result sections: `SectionA_Verdict.jsx` (dynamic reasoning sentence), `SectionB_TaxSummary.jsx` (TDS refund/due), `SectionC_DetailedBreakdown.jsx` (collapsible side-by-side table), `SectionD_Education.jsx`, and `SectionE_NextSteps.jsx`.
    *   Assemble them into `S14_Results.jsx`.
    *   Hook up the "Go back and edit" and "Start Over" buttons.
*   **Verification:** After the calculation animation, the app presents a full-page result. It explicitly recommends a regime, shows exactly how much is saved, details the math in a collapsible table, and provides educational context. Clicking "Edit" takes you back to S04 with data preserved.

## Phase 10: Polish & Content Completeness
**Goal:** Finalize text, warnings, edge cases, and mobile responsiveness.

*   **Tasks:**
    *   Populate all `CommonQuestions` arrays with the actual FAQ text from the PRD.
    *   Ensure all conditional warnings (e.g., Surcharge warning > ₹50L, Basic > Take-home warning) trigger correctly.
    *   Perform a final pass for exact Tailwind color matching, padding, and font sizing across mobile and desktop.
    *   Verify against the 19 explicit test cases listed in Section 16 of the PRD.
*   **Verification:** The application matches the PRD verbatim in every visual and logical detail. All FAQs are readable, edge cases are handled gracefully, and tax numbers strictly align with FY 2025-26 rules.
