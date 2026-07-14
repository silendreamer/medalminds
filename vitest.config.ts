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
    // e2e/** is Playwright's suite (npm run test:e2e), not Vitest's — without
    // this exclude, Vitest's default `**/*.spec.ts` include glob picks up
    // e2e/auth.spec.ts and crashes on the @playwright/test import. See
    // AUTH_TEST_PLAN.md: e2e must stay out of `npm test` entirely.
    exclude: [".claude/**", "node_modules/**", "e2e/**"]
  }
});
