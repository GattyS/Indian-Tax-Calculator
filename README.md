# TaxClarity 📊
### Premium Indian Income Tax Calculator (FY 2025-26 Compliant)

**TaxClarity** is a modern, step-by-step, highly interactive web application designed to help Indian taxpayers estimate, compare, and optimize their tax liabilities. It provides a visual and intuitive breakdown of tax computations under both the **Old Tax Regime** and the **New Tax Regime**, updated with the latest regulations for **Financial Year 2025-26**.

---

## 🚀 Key Features

- **Step-by-Step Flow:** Interactive 14-step wizard guiding you seamlessly from basic details to tax savings, exemptions, and final comparisons.
- **Real-Time Preview Panel:** Side panel that updates instantly with tax summaries as you input your salary details and deductions.
- **FY 2025-26 Slab Compliance:** Fully up to date with the latest slabs, revised standard deduction rules, and rebate limits.
- **Regime Comparison:** Compare the Old vs. New Tax Regimes side-by-side to choose the most tax-efficient path.
- **Comprehensive Deduction Support:**
  - HRA (House Rent Allowance) calculation with metro/non-metro rules.
  - Section 80C (EPF, LIC, PPF, ELSS, Tuition fees, Principal on Home Loan).
  - Section 80D (Self and Parent Health Insurance).
  - Section 80CCD(1B) / 80CCD(2) (NPS contributions).
  - Section 24(b) (Home Loan Interest deductions).
  - Professional Tax & TDS tracking.
- **Premium Aesthetics:** Sleek navy-teal theme, smooth glassmorphism, clean cards, responsive layout, and beautiful typography.

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Icons:** Custom SVG iconography
- **State Management:** React Hooks

---

## 💻 Getting Started

Follow these steps to run the application locally on your computer:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16.0 or higher recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/GattyS/Indian-Tax-Calculator.git
cd Indian-Tax-Calculator
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to view the application.

### 5. Build for Production
To build the application for deployment:
```bash
npm run build
```
This will compile the application into a highly optimized bundle inside the `dist/` directory, ready to be hosted on Netlify, Vercel, GitHub Pages, or any web server.

---

## 📂 Project Structure

```text
├── .gitignore              # Tells Git which files to ignore (like node_modules)
├── index.html              # Main HTML entry point
├── package.json            # Scripts and dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite bundler configuration
├── src/
│   ├── main.jsx            # React application entry point
│   ├── index.css           # Styling entry & custom utility classes
│   ├── App.jsx             # Main application state and wizard logic
│   ├── components/         
│   │   ├── layout/         # StepWrapper and TaxPreviewPanel layouts
│   │   └── steps/          # Steps 01 to 14 of the wizard
│   └── lib/                # Tax calculation engines and helper utilities
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
