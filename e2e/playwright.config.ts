import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

// AUTH-072: local-only e2e smoke suite. Run via `npm run test:e2e`.
// Requires a real local PostgreSQL database (DATABASE_URL in .env.local) —
// NOT wired into `npm test` / CI. See AUTH_TEST_PLAN.md Layer 2.
const PROJECT_ROOT = path.resolve(__dirname, "..");

export default defineConfig({
  testDir: __dirname,
  testMatch: /.*\.spec\.ts/,
  globalSetup: path.resolve(__dirname, "global-setup.ts"),
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    cwd: PROJECT_ROOT,
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
