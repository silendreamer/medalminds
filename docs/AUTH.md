# Authentication — Ops Runbook

Companion to the "Authentication" section in `CLAUDE.md` (what's built, file map) and
`docs/auth-plan/AUTH_ARCHITECTURE.md` (full design rationale). This document covers
day-2 operations: secrets, email delivery, roles, sessions, and cleanup. It assumes
you can already reach the production (or a scratch) PostgreSQL database with `psql`
or an equivalent SQL client.

For a step-by-step functional walkthrough of every auth flow, see `e2e/MANUAL_QA.md`
instead — this document is about *operating* the system, not testing it.

## Secrets

### `BETTER_AUTH_SECRET`

- Generate: `openssl rand -base64 32`
- Required in production — `src/lib/auth.ts` passes it straight through to
  `betterAuth({ secret: process.env.BETTER_AUTH_SECRET })`. It signs session
  cookies/tokens. In dev, Better Auth falls back with a console warning if unset;
  don't rely on that in production.
- Set it in Vercel project env vars and in `.env.local` for local development.

### Leaked-secret incident playbook

1. Generate a new secret: `openssl rand -base64 32`.
2. Set `BETTER_AUTH_SECRET` to the new value in Vercel and redeploy (also update
   `.env.local` for anyone developing locally against the same DB).
3. The new secret alone invalidates every session Better Auth issues from now on,
   but stale `Session` rows still exist and reference the old signing context.
   Truncate the table so there's no ambiguity:
   ```sql
   TRUNCATE TABLE "Session";
   ```
4. Every signed-in user is redirected to `/login` on their next request. No
   password reset is required — secret rotation doesn't touch `Account.password`
   hashes.
5. If the leak also exposed the database connection string or password hashes,
   treat that as a separate, more serious incident (rotate `DATABASE_URL` / the DB
   password too, not just `BETTER_AUTH_SECRET`).

## Email (Resend)

- Sending code: `src/lib/email/sendEmail.ts`. When `RESEND_API_KEY` is unset,
  every email is logged to the console instead of sent — this is the dev/test
  default and is safe to leave unset anywhere real delivery isn't needed.
- Templates: `src/lib/email/templates.ts` (verification, reset-password,
  password-changed, account-deleted — pure functions, HTML-escaped). The contract
  module `src/lib/auth.ts` imports by name is `src/lib/email/authEmails.ts`.
- To enable real delivery:
  1. Create a Resend account and add + verify your sending domain (Resend gives
     you the SPF/DKIM DNS records to add — see
     https://resend.com/docs/dashboard/domains/introduction).
  2. Set `RESEND_API_KEY` in Vercel project env vars.
  3. Set `EMAIL_FROM` to an address on the verified domain, e.g.
     `EMAIL_FROM="MedalMinds <no-reply@medalminds.com>"` — this is also the
     hardcoded default in `sendEmail.ts` if `EMAIL_FROM` is unset, so it only
     needs to be set explicitly if you want a different sender identity.

## Roles

Enum: `UserRole { STUDENT PARENT ADMIN }` (`prisma/schema.prisma`).

Signup can only ever produce `STUDENT` or `PARENT`. `src/lib/auth.ts` declares
`user.additionalFields.role` with `input: true` (so the signup form can pass a
value at all), but a `databaseHooks.user.create.before` hook (`clampRole`)
rewrites any value other than `"STUDENT"`/`"PARENT"` — including `"ADMIN"` sent
directly via `curl` — to `"STUDENT"` before the row is created. There is no
client-reachable path to `ADMIN`.

### Promoting a user to ADMIN

Direct SQL only — there is no UI or API route for this by design:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'someone@example.com';
```

## Sessions

### Revoking all sessions for one user

```sql
DELETE FROM "Session"
WHERE "userId" = (SELECT id FROM "User" WHERE email = 'someone@example.com');
```

The user is forced to log in again on their next request — the session cookie no
longer matches any row.

### Revoking every session in the system

```sql
TRUNCATE TABLE "Session";
```

(Same statement as step 3 of the leaked-secret playbook above.)

## Expired-row cleanup

`Session`, `Verification`, and `RateLimit` rows are never proactively deleted by
the app — they just expire (`Session.expiresAt`, `Verification.expiresAt`) or go
stale (`RateLimit.lastRequest`). Indexes already exist to make cleanup cheap
whenever it's built: `Session_expiresAt_idx`, `Verification_expiresAt_idx`,
`RateLimit_key_idx` (see
`prisma/migrations/20260713163219_auth_baseline/migration.sql`).

Manual cleanup, if a table grows large before a cron job exists:

```sql
DELETE FROM "Session" WHERE "expiresAt" < now();
DELETE FROM "Verification" WHERE "expiresAt" < now();
```

`RateLimit` has no timestamp column suitable for a clean `now()` comparison
(`lastRequest` is a unix-ms `BIGINT`); a reasonable manual rule is to delete rows
whose `lastRequest` is more than a day or two old.

A scheduled job (Vercel Cron hitting a small API route, or a periodic SQL job) to
run the two `DELETE`s above automatically is a known follow-up — **not yet
built**.

## Historical note: the old "User" table

Before this rollout, `prisma/schema.prisma` briefly contained a different,
unrelated `User` model as part of an abandoned "v2 content architecture" (user
progress tracking via `PracticeAttempt`/`TestAttempt`/`TestAttemptAnswer`,
introduced in commit `fa3fac5`, "DB architecture v2: drop denormalized columns,
add enums, soft delete, user progress schema"). That content-DB effort was later
abandoned and those models were removed from `schema.prisma` in commit `53acdcd`
("clean: website-only branch — remove pipeline, slim Prisma to buzzer-only").
Removing a model from `schema.prisma` does not drop its table from an
already-migrated database — no migration ever ran to drop `User`,
`PracticeAttempt`, `TestAttempt`, or `TestAttemptAnswer`.

When this auth rollout needed the `User` name for Better Auth, the live dev
database still had those four tables sitting orphaned from the abandoned effort.
They were verified empty and dropped directly against the database (outside of a
Prisma migration, since Prisma no longer had any model referencing them) to free
up the `User` name, before migration `20260713163219_auth_baseline` created the
new Better Auth `User` table.

**If you're reading this because you noticed the old v2 content-progress tables
are gone with no corresponding code diff: this is why.** Nothing regressed —
those tables were never wired to any live feature, and the code that would have
used them was already deleted in `53acdcd`.

## See also

- `docs/auth-plan/AUTH_ARCHITECTURE.md` — full design rationale, module map, and
  the `betterAuth` configuration decision record.
- `e2e/MANUAL_QA.md` — step-by-step manual verification script for every auth
  flow (signup, verify, login, forgot/reset password, session revocation, account
  deletion) plus a security checklist (open-redirect, role-escalation attempt,
  rate limiting, DB-less regression, etc.).
