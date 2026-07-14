# Manual QA — Authentication (AUTH-073)

Full-flow walkthrough for the auth system, to be run by hand against a local
dev server. Written so someone with **zero prior context on this codebase**
can execute it start to finish without asking questions.

Covers every flow in `docs/auth-plan/AUTH_ARCHITECTURE.md` §10 (Part A) plus
the 10-item verification checklist in `docs/auth-plan/AUTH_SECURITY_PLAN.md`
(Part B).

## 0. Setup (do this once)

1. You need a local PostgreSQL database with the auth + buzzer migrations
   applied, and `DATABASE_URL` set in `.env.local` at the repo root. If you
   don't already have this, ask whoever set up the dev environment — this
   doc does not cover provisioning a database.
2. **Do not set `RESEND_API_KEY`** in `.env.local`. Leaving it unset puts
   the app in "console email transport" mode: every email the app would
   send instead prints a plain-text block to the terminal running
   `npm run dev`. This is required for steps A2, A4, A5 below (you'll copy
   verification/reset links straight out of that terminal).
3. From the repo root:
   ```
   npm run db:deploy
   npm run dev
   ```
   Leave this terminal visible — you will read email links out of it.
4. Open a second terminal for `curl` commands (Part B). Keep it separate
   from the `npm run dev` terminal so you don't lose the email log output.
5. Use two different browsers (or one normal + one incognito/private
   window) for the two-browser session-revocation check in A6. This doc
   calls them **Browser A** and **Browser B**.
6. Every step below assumes the app is reachable at `http://localhost:3000`.
   If your dev server runs on a different port, substitute it throughout.

Pick a scratch email address you don't mind being "used" repeatedly, e.g.
`qa-run1@example.com`. Use a fresh one (`qa-run2@example.com`, etc.) each
time you redo this script from the top, since step A1 asserts duplicate-email
behavior and a fully deleted-then-recreated account can otherwise get
confusing to reason about.

---

## Part A — Flow walkthrough (AUTH_ARCHITECTURE.md §10)

### A1. Signup

1. Go to `http://localhost:3000/signup`.
2. Fill in: Name = `QA Tester`, Email = `qa-run1@example.com`, Password =
   `correct-horse-battery`, Confirm = `correct-horse-battery`, role = leave
   on the default "I'm a student".
3. Submit.
   - **Expected:** the form switches to a "check your inbox" success state.
     No error, no redirect to `/login`.
4. In the `npm run dev` terminal, find a block that looks like:
   ```
   ----- EMAIL (console fallback, RESEND_API_KEY not set) -----
   To: qa-run1@example.com
   Subject: Verify your MedalMinds email address

   Hi QA Tester,
   ...
   Verify your email: http://localhost:3000/api/auth/verify-email?token=...&callbackURL=...
   ...
   --------------------------------------------------------------
   ```
   **Expected:** the block is present (proves `sendOnSignUp` fired), and the
   log line does **not** print the account's password anywhere in this
   terminal (scroll up to the request itself if unsure — passwords must
   never appear in logs per `AUTH_SECURITY_PLAN.md` §1).
5. Now redo the signup with the **same email** (`qa-run1@example.com`),
   any password.
   - **Expected:** byte-identical success UI to step 3 — no "email already
     exists" wording, no visibly different state. (This is checklist item
     B1 below; doing it here just confirms the UX, item B1 additionally
     confirms no duplicate row was created.)

### A2. Verify

1. Copy the full verify URL from the console log block in A1 step 4
   (starts with `http://localhost:3000/api/auth/verify-email?token=...`).
2. Paste it into the browser address bar and go.
   - **Expected:** you land on `/verify-email?status=success`, see a
     "you're signed in" / verified confirmation message, and a button/link
     to `/account`.
3. Click through to `/account`.
   - **Expected:** the profile page renders (no redirect to `/login`), shows
     Name "QA Tester", Email `qa-run1@example.com`, Role "Student", Email
     verified = "Verified".

### A3. Login — remember-me both states

**Checked (default):**
1. Log out first if still signed in (UserMenu → your name → "Log out").
2. Go to `/login`. Enter the email/password from A1. Leave "Remember me"
   checked (it's checked by default).
3. Submit. **Expected:** redirected to `/account`.
4. Open DevTools → Application/Storage → Cookies → `http://localhost:3000`.
   Find the cookie named `medalminds.session_token`.
   **Expected:** it has an `Expires` date roughly 30 days out (not
   "Session").

**Unchecked:**
1. Log out.
2. Go to `/login`, same credentials, but **uncheck** "Remember me" before
   submitting.
3. Submit. **Expected:** redirected to `/account` as before.
4. Check the same cookie in DevTools.
   **Expected:** `Expires` / `Max-Age` is absent (browser-session cookie —
   DevTools may show this as "Session" in the Expires column).

### A4. Forgot / reset password

1. Log out. Go to `/forgot-password`.
2. Enter `qa-run1@example.com`, submit.
   **Expected:** a fixed success message (e.g. "If an account exists for
   this email, a reset link has been sent") — regardless of whether the
   email exists. Repeat with a made-up email `nobody-xyz@example.com` and
   confirm the message is byte-identical.
3. In the `npm run dev` terminal, find the "Reset your MedalMinds password"
   console email block for `qa-run1@example.com` and copy the reset URL
   (`http://localhost:3000/reset-password?token=...`).
4. Open that URL. Enter a new password twice, e.g. `new-correct-horse-99`.
   Submit.
   **Expected:** success panel with a link/CTA to `/login`.
5. Go to `/login`, sign in with the **new** password.
   **Expected:** succeeds, lands on `/account`.
6. Sign in with the **old** password (`correct-horse-battery`) instead.
   **Expected:** fails with the generic error text "Incorrect email or
   password. Please try again." (old password no longer works — reset
   revoked/replaced the credential).

### A5. Change password + two-browser session revocation

1. In **Browser A**: log in as `qa-run1@example.com` with the current
   password (from A4 step 4).
2. In **Browser B**: also log in as `qa-run1@example.com`, same password.
   Confirm both browsers show `/account` successfully.
3. In **Browser A**, go to `/account/security`. Fill in the change-password
   form: Current password = the one from step 1, New password =
   `even-newer-password-1`, Confirm = same. Submit.
   **Expected:** success message; Browser A's own session stays logged in
   (no forced logout).
4. Check the `npm run dev` terminal for a "Your MedalMinds password was
   changed" console email block addressed to `qa-run1@example.com`.
   **Expected:** present.
5. In **Browser B**, navigate to any `/account/*` page (e.g. click
   "Profile" in the nav, or refresh `/account`).
   **Expected:** Browser B is now logged out — redirected to
   `/login?next=%2Faccount`. (`revokeOtherSessions: true` on
   `changePassword` killed Browser B's session; Browser A's session
   persists because the current session is exempted.)

### A6. Active sessions list / revoke

1. In **Browser A** (still logged in from A5), log in **again** with
   Browser B using the new password, so you again have two live sessions.
2. In Browser A, go to `/account/security`. Find the sessions list.
   **Expected:** at least two rows — one marked "current", one representing
   Browser B's session (a different UA string / created time).
3. Click "Revoke" on the non-current (Browser B) row.
   **Expected:** the row disappears from Browser A's list immediately (or
   after the list refetches).
4. In Browser B, navigate anywhere under `/account/*`.
   **Expected:** logged out, redirected to `/login?next=%2F...`.

### A7. Delete account

1. In Browser A, still logged in as `qa-run1@example.com`, go to
   `/account/settings`. Open the "Danger zone" section.
2. Enter the current password. In the confirmation text field, type the
   literal word `DELETE`. Click the delete/confirm button.
   **Expected:** you're redirected to `/`.
3. Check the `npm run dev` terminal for a "Your MedalMinds account has been
   deleted" console email block.
   **Expected:** present.
4. Try to log in again at `/login` with the same email/password.
   **Expected:** fails with the same generic "Incorrect email or password"
   error (account no longer exists, and this must not read differently
   from "wrong password" — no enumeration signal).
5. This also satisfies checklist item B10 below.

---

## Part B — Security verification checklist (AUTH_SECURITY_PLAN.md)

Run these against a **fresh** signup (`qa-sec@example.com`) so Part A's
deletion in A7 doesn't interfere. Steps assume `npm run dev` is still
running at `http://localhost:3000` with `RESEND_API_KEY` unset.

### B1. Signup with existing email → identical UX, no duplicate row

Already exercised in A1 step 5. To additionally confirm no duplicate DB row
was created, run (from the repo root, with `DATABASE_URL` set):
```
npx prisma studio
```
Open the `User` table, filter by email `qa-run1@example.com` (or whichever
email you reused). **Expected:** exactly one row.

### B2. Login before verification → blocked with resend option

1. Sign up a new account, e.g. `qa-unverified@example.com`, but **do not**
   click the verification link.
2. Go to `/login` and attempt to sign in with that email/password.
   **Expected:** an inline info message like "Your email isn't verified
   yet…" with a "resend it" action — not the generic
   incorrect-password error, and not a silent success.

### B3. Open-redirect: `?next=` payloads all land on `/account`

For each of the three URLs below, load it, then log in with any valid
verified account's credentials:
1. `http://localhost:3000/login?next=%2F%2Fevil.com`
2. `http://localhost:3000/login?next=https%3A%2F%2Fevil.com`
3. `http://localhost:3000/login?next=%2F%5Cevil`

**Expected in all three cases:** after a successful login, the browser ends
up at `http://localhost:3000/account` — never navigates to `evil.com` or
anywhere off-origin. (This is `sanitizeNextPath` doing its job; see
`src/lib/redirects.ts` and its unit tests in `src/lib/redirects.test.ts` for
the full rule set.)

### B4. Forged/garbage session cookie → proxy passes, layout redirects, no 500

```
curl -i http://localhost:3000/account -H "Cookie: medalminds.session_token=not-a-real-token-abc123"
```
**Expected:** HTTP response is a redirect (`307` or `302`) to
`/login?next=%2Faccount` — **not** a `500`. (The cookie's mere *presence*
satisfies `src/proxy.ts`'s optimistic check and lets the request through to
`/account/layout.tsx`, which calls `requireSession` and does the real
DB-backed check server-side; a garbage token fails that check and redirects
again, cleanly.)

### B5. Reused reset-token → error panel

1. Trigger a password reset for a real account (`/forgot-password`), copy
   the reset link from the console log, and use it once to successfully
   reset the password (as in A4).
2. Now open the **same** reset link again (browser back button, or paste
   the URL again) and try to reset the password a second time with the
   same token.
   **Expected:** an error panel (invalid/expired token), with a link back
   to `/forgot-password` — not a second successful reset.

### B6. Password change on device A → device B logged out on next navigation

Already exercised in A5. **Expected:** confirmed there — Browser B is
logged out only once it navigates again (not necessarily instantly), which
is expected DB-backed session behavior, not a bug.

### B7. `curl` role-escalation attempt → row has `STUDENT`

```
curl -s -i -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"email":"qa-role-escalation@example.com","password":"correct-horse-battery","name":"Role Escalation Test","role":"ADMIN"}'
```
**Expected:** `200`/`201`-range response. Then check the DB:
```
npx prisma studio
```
Open `User`, find `qa-role-escalation@example.com`.
**Expected:** `role` column = `STUDENT`, never `ADMIN`. (Enforced by the
`databaseHooks.user.create.before` clamp in `src/lib/auth.ts` — see
`clampRole`.)

### B8. Rapid-fire login attempts → 429s appear

```
for i in $(seq 1 30); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/auth/sign-in/email \
    -H "Content-Type: application/json" \
    -d '{"email":"qa-rate-limit-test@example.com","password":"wrong-password-xyz"}'
done
```
(If your shell is PowerShell, not bash, use:
```
1..30 | ForEach-Object {
  (Invoke-WebRequest -Uri "http://localhost:3000/api/auth/sign-in/email" -Method Post -ContentType "application/json" -Body '{"email":"qa-rate-limit-test@example.com","password":"wrong-password-xyz"}' -SkipHttpErrorCheck).StatusCode
}
```
)
**Expected:** the first several requests return `401`/`400`-range codes
(bad credentials), and once the per-IP+path rate limit window is exceeded,
subsequent requests return `429`. Exact request count before `429` depends
on the library default window/max configured in `src/lib/auth.ts`
(`rateLimit: { window: 60, max: 20 }` is the *global* baseline; sign-in has
its own stricter built-in window) — you don't need to count exactly, just
confirm `429` shows up somewhere in the run. This check is flaky/timing
sensitive by design; if you don't see a `429`, wait a minute (window reset)
and try again with a tighter loop (no delay between requests).

### B9. DB-less regression: public pages/buzzer still work, `/account` still gates, `/login` still renders

1. Stop `npm run dev` (Ctrl+C).
2. Temporarily rename or comment out `DATABASE_URL` (and any
   `POSTGRES_*` vars) in `.env.local`.
3. Restart: `npm run dev`.
4. Visit each of the following and confirm they render `200` with real
   content (not a crash page):
   - `http://localhost:3000/`
   - `http://localhost:3000/science-bowl/high-school/practice` (or any
     content route)
   - `http://localhost:3000/science-bowl/buzzer`
5. Visit `http://localhost:3000/account`.
   **Expected:** redirected to `/login` (still gated correctly even with no
   DB — `getSessionCookie` in `src/proxy.ts` only inspects the cookie, it
   doesn't touch the DB).
6. Visit `http://localhost:3000/login` directly.
   **Expected:** the page renders normally. Try submitting the login form
   with any credentials.
   **Expected:** a server-side error message is shown (not a blank page,
   not an unhandled exception/500 crash page) — `getAuth()`/DB calls fail
   gracefully.
7. Restore `DATABASE_URL` (and any other vars) in `.env.local` and restart
   `npm run dev` before continuing with anything else.

This also double-checks the standing guarantee that `npm test` itself
never needs step 1-2's manual env surgery — `test/setup.ts` already does
this automatically for the Vitest suite on every run.

### B10. Delete account → re-login fails, rows gone

Already exercised in A7. To additionally confirm the DB rows are actually
gone (not just logically hidden):
```
npx prisma studio
```
Open `User`, `Account`, `Session` tables, filter by the deleted account's
email/userId.
**Expected:** zero rows in all three tables for that user (cascade delete).

---

## Sign-off

Once every step in Part A and Part B has an observed "Expected" outcome
matching what's written above, the auth rollout is manually verified. Note
any deviation (what you saw instead) against the specific step number when
reporting results — don't summarize as pass/fail only.
