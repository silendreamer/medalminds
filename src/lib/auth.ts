import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import type { Account, User } from "better-auth";

import { getPrisma } from "@/lib/db";
import {
  sendPasswordChangedNotice,
  sendResetPasswordEmail,
  sendVerificationEmailFn,
} from "@/lib/email/authEmails";

const globalForAuth = globalThis as unknown as {
  auth?: Auth;
};

// Role values a client may legitimately request at signup. Anything else
// (including "ADMIN") is clamped to "STUDENT". ADMIN is only ever assigned
// via direct SQL (see AUTH_DATABASE_PLAN.md / ops runbook).
const CLIENT_ASSIGNABLE_ROLES = new Set(["STUDENT", "PARENT"]);

function clampRole(role: unknown): "STUDENT" | "PARENT" {
  return typeof role === "string" && CLIENT_ASSIGNABLE_ROLES.has(role)
    ? (role as "STUDENT" | "PARENT")
    : "STUDENT";
}

// Canonical production origin. The live site serves from www (the apex
// medalminds.com 301-redirects to www.medalminds.com), so www is canonical.
const CANONICAL_SITE_URL = "https://www.medalminds.com";

// Every origin a real browser may send. Both apex and www are always trusted
// regardless of BETTER_AUTH_URL, so a missing/mismatched env var can never
// again collapse trustedOrigins and 403 every request with INVALID_ORIGIN
// (the "Something went wrong" / "Invalid origin" signup failure).
const ALWAYS_TRUSTED_ORIGINS = [
  "https://www.medalminds.com",
  "https://medalminds.com",
  "http://localhost:3000",
];

function buildAuth() {
  const siteUrl =
    process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_SITE_URL;

  return betterAuth({
    database: prismaAdapter(getPrisma(), { provider: "postgresql" }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: siteUrl,
    trustedOrigins: [...new Set([siteUrl, ...ALWAYS_TRUSTED_ORIGINS])],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 10,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: sendResetPasswordEmail,
      resetPasswordTokenExpiresIn: 3600,
    },
    emailVerification: {
      sendVerificationEmail: sendVerificationEmailFn,
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 3600,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24, // 1 day sliding refresh
      cookieCache: {
        enabled: true,
        maxAge: 300, // 5 minutes
      },
    },
    user: {
      additionalFields: {
        role: { type: "string", defaultValue: "STUDENT", input: true },
      },
      changeEmail: { enabled: false },
      deleteUser: { enabled: true },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      modelName: "RateLimit",
      window: 60,
      max: 20,
    },
    advanced: {
      cookiePrefix: "medalminds",
    },
    databaseHooks: {
      user: {
        create: {
          // Hard security requirement: no client path may assign a role
          // other than STUDENT/PARENT. ADMIN is unreachable here.
          before: async (user) => {
            const incoming = user as User & Record<string, unknown>;
            return {
              data: {
                ...incoming,
                role: clampRole(incoming.role),
              },
            };
          },
        },
      },
      account: {
        update: {
          // Fires whenever the credential account row changes. Today the
          // only mutator is a password change/reset, so this is equivalent
          // to "password changed" — narrowed by providerId/password to stay
          // correct if OAuth accounts are added later (their updates won't
          // carry a `password`).
          after: async (account: Account & Record<string, unknown>) => {
            if (account.providerId !== "credential" || !account.password) {
              return;
            }
            try {
              const user = await getPrisma().user.findUnique({
                where: { id: account.userId },
                select: { email: true, name: true },
              });
              if (user) {
                await sendPasswordChangedNotice({ email: user.email, name: user.name });
              }
            } catch (error) {
              console.error("auth.databaseHooks.account.update.after: failed to notify", error);
            }
          },
        },
      },
    },
  });
}

export type Auth = ReturnType<typeof buildAuth>;

export function getAuth(): Auth {
  if (!globalForAuth.auth) {
    globalForAuth.auth = buildAuth();
  }
  return globalForAuth.auth;
}
