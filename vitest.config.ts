import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    // The science-bowl readers dynamic-import content/nsb/json/questions.json
    // (~24 MB) on first call and memoize it. Whichever test hits that reader
    // first pays the full cold-load cost, which exceeds Vitest's default 5s on
    // CI/cold disks. Give every test generous headroom rather than sprinkling
    // per-test overrides.
    testTimeout: 60000,
    hookTimeout: 60000,
    // e2e/** is Playwright's suite (npm run test:e2e), not Vitest's — without
    // this exclude, Vitest's default `**/*.spec.ts` include glob picks up
    // e2e/auth.spec.ts and crashes on the @playwright/test import. See
    // AUTH_TEST_PLAN.md: e2e must stay out of `npm test` entirely.
    exclude: [".claude/**", "node_modules/**", "e2e/**"]
  }
});
