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

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Install Playwright Browsers
```bash
npx playwright install
```

### 3️⃣ Run tests

Full test run:
```bash
npx playwright test
```

Run headful:
```bash
npx playwright test --headed
```

Run a specific file:
```bash
npx playwright test tests/dashboard.spec.js
```

### 📊 Reports

#### 🟩 Playwright HTML Report
```bash
npx playwright show-report
```
### 🧵 Allure Report

Generate the report:
```bash
allure generate allure-results --clean -o allure-report
```

Open the report:
```bash
allure open allure-report
```

---

## 🧩 Page Object Model (POM)

This framework uses the **Page Object Model** to keep tests clean, readable, and maintainable.

- Each page has its own class under `/pages`
- Locators are defined once and reused everywhere
- Test files contain only **test logic**, not selectors or UI details

### Example:
```js
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.actualWidgetNames = page.locator(".orangehrm-dashboard-widget-name");
  }
}
```

---

## 🧰 Fixtures

Playwright fixtures help with:

- initializing POM classes  
- navigating between pages  
- reusing login/session setup  
- sharing test utilities and data  

### Example:
```js
test("Validate Widget Titles", async ({ dashboardPage }) => {
  await expect(dashboardPage.actualWidgetNames.first())
    .toHaveText("Time at Work");
});
```

---

## 🔐 Environment Configuration

Environment variables are stored in `.env` files:

```
BASE_URL=
USERNAME=
PASSWORD=
HEADLESS=true
```

Your `playwright.config.js` dynamically loads these values, making the framework flexible across environments.

---

## 🧼 .gitignore

This project ignores sensitive and generated files:

- `node_modules/`
- `test-results/`
- `allure-results/`
- `playwright-report/`
- `.env` and environment files

This keeps the repository clean and secure.

---

## 🧑‍💻 Author

**Buse Aksit**  
UI Automation Engineer | SDET  
🔗 GitHub: https://github.com/buseaksit


