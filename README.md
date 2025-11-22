# 🟧 OrangeHRM UI Automation Framework  
UI Test Automation using Playwright (TypeScript)

This repository contains a complete **UI automation framework for OrangeHRM** built using **Playwright**, following best practices such as Page Object Model (POM), custom fixtures, reusable selectors, environment configuration, assertions, and reporting.

---

## 🚀 Features

### ✅ **Playwright UI Automation**
- Login workflows  
- Dashboard widget validations  
- Admin module validation  
- PIM module filters  
- Form validations & error message checks  

---

## 🧱 **Project Architecture**
```
OrangeHRM-UI-Automation
│
├── auth/                  # Login helpers / storage state
├── config/                # Environment config files
├── pages/                 # Page Object Model (POM) classes
├── tests/                 # UI test specs
├── utils/                 # Reusable utilities
│
├── playwright.config.js   # Global Playwright configuration
├── package.json           # Project dependencies
└── README.md
```

---

## 📌 **Tech Stack**
- **Node.js**
- **Playwright**
- **TypeScript / JavaScript**
- **Allure Reporting**
- **POM (Page Object Model)**

---

## ⚙️ **Setup Instructions**

### 1️⃣ **Install dependencies**
```bash
npm install
2️⃣ Install Playwright Browsers
npx playwright install

3️⃣ Run tests

Full test run:

npx playwright test


Run headful:

npx playwright test --headed


Run a specific file:

npx playwright test tests/dashboard.spec.js

🧪 Reports
📊 Playwright HTML Report
npx playwright show-report

🧵 Allure Report

Generate report:

allure generate allure-results --clean -o allure-report


Open report:

allure open allure-report

🧩 Page Object Model (POM)

This framework uses POM to keep tests clean and maintainable:

Each page has its own class under /pages

Locators are defined once and reused everywhere

Test files only contain test logic — not selectors

Example:

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.actualWidgetNames = page.locator(".orangehrm-dashboard-widget-name");
  }
}

🧰 Fixtures

Playwright fixtures are used to:

initialize pages

provide custom navigation methods

reuse login setup

share test data

Example:

test("Validate Widget Titles", async ({ dashboardPage }) => {
  await expect(dashboardPage.actualWidgetNames.first())
    .toHaveText("Time at Work");
});

🔐 Environment Configuration

Environment variables are loaded from .env files:

BASE_URL=
USERNAME=
PASSWORD=
HEADLESS=true

The main config dynamically uses them.

🧼 .gitignore

This project ignores:

node_modules

test-results

allure-results

playwright-report

.env files


🧑‍💻 Author

Buse Aksit
UI Automation Engineer | SDET
GitHub: https://github.com/buseaksit
