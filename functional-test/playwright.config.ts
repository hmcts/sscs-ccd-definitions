import { defineConfig, devices } from "@playwright/test";
import {urls} from "./config/config";
import path from 'path';


module.exports = defineConfig({
  testDir: "./e2e/",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0, // Set the number of retries for all projects

  timeout: 3 * 30 * 1000,
  expect: {
    timeout: 60 * 1000,
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 5 : undefined,
  reporter: [[process.env.CI ? "html" : "list", { open: "never", outputDir: '../playwright-report/'}]],
  use: {
    baseURL: urls.xuiUrl,
    trace: "on-first-retry",
  },
  // globalSetup: '../src/tests/e2e/global.setup.ts',
  projects: [
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"]
      }
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "MobileChrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "MobileSafari",
    //   use: { ...devices["iPhone 12"] },
    // },
    // {
    //   name: "MicrosoftEdge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
  ],
});
