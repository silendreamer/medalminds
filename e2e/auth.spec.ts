import { expect, test } from "@playwright/test";

import { E2E_TEST_USER } from "./global-setup";

// AUTH-072: e2e smoke suite. Explicit non-goals (see AUTH_TEST_PLAN.md
// Layer 2): the email-verification loop, the password-reset loop (token
// lives in an email; covered by the manual QA script AUTH-073), and
// rate-limit assertions (flaky by design). Uses the pre-seeded verified
// user from e2e/global-setup.ts so login is reachable without driving the
// email loop.

test.describe("auth smoke", () => {
  test("anonymous /account redirects to /login?next=%2Faccount", async ({ page }) => {
    await page.goto("/account");
    await expect(page).toHaveURL(/\/login\?next=%2Faccount/);
  });

  test("login with seeded user redirects to /account and shows the seeded name", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(E2E_TEST_USER.email);
    await page.getByLabel("Password").fill(E2E_TEST_USER.password);
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page).toHaveURL(/\/account$/);
    // Scope to the profile row: the header's UserMenu button also renders
    // the user's name, so an unscoped locator would be ambiguous (strict
    // mode violation).
    await expect(page.locator(".account-profile-value").getByText(E2E_TEST_USER.name)).toBeVisible();
  });

  test("header shows a user menu when signed in", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(E2E_TEST_USER.email);
    await page.getByLabel("Password").fill(E2E_TEST_USER.password);
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page).toHaveURL(/\/account$/);

    // The header's UserMenu renders a button whose accessible name starts
    // with the user's display name once signed in (see
    // src/components/auth/UserMenu.tsx).
    await expect(
      page.getByRole("button", { name: new RegExp(E2E_TEST_USER.name) })
    ).toBeVisible();
  });

  test("logout returns to / and /account redirects again", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(E2E_TEST_USER.email);
    await page.getByLabel("Password").fill(E2E_TEST_USER.password);
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page).toHaveURL(/\/account$/);

    const userMenuButton = page.getByRole("button", { name: new RegExp(E2E_TEST_USER.name) });
    await userMenuButton.click();
    await page.getByRole("menuitem", { name: "Log out" }).click();

    await expect(page).toHaveURL("http://localhost:3000/");

    await page.goto("/account");
    await expect(page).toHaveURL(/\/login\?next=%2Faccount/);
  });

  test("login with wrong password shows a generic error and stays on /login", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(E2E_TEST_USER.email);
    await page.getByLabel("Password").fill("definitely-the-wrong-password");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText("Incorrect email or password. Please try again.")).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
