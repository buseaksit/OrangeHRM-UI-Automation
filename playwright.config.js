import { defineConfig } from '@playwright/test';
import {env} from './utils/load_env.js'

const STORAGE_PATH = env.STORAGE_PATH;   // one source of truth

export default defineConfig({
  // -------- global defaults --------
  timeout: 45_000,
  reporter: [
    ['allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: false
      }
    ],
    ['html', { open: 'never' }]],
  use: {
    baseURL: env.BASE_URL,
    trace: env.TRACE,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: env.HEADLESS
  },

  // -------- project matrix --------
  projects: [
    {
      name: 'setup',                      // 1️⃣ writes the JSON
      testMatch: /global\.setup\.js/,
      use: { storageState: undefined }    // don't try to read it yet
    },
    {
      name: 'chromium',                   // 2️⃣ real tests
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        storageState: STORAGE_PATH
      }
    },
    {
      name: 'firefox',                    // 3️⃣ another browser
      dependencies: ['setup'],
      use: {
        browserName: 'firefox',
        storageState: STORAGE_PATH
      }
    }
  ]
});