import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { getAuth } from "@/lib/auth";

export type Role = "STUDENT" | "PARENT" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  emailVerified: boolean;
  image: string | null;
};

export type AppSession = {
  user: SessionUser;
  session: { id: string; expiresAt: Date };
};

const VALID_ROLES: readonly Role[] = ["STUDENT", "PARENT", "ADMIN"];

function coerceRole(role: unknown): Role {
  return typeof role === "string" && (VALID_ROLES as readonly string[]).includes(role)
    ? (role as Role)
    : "STUDENT";
}

/**
 * Reads the current session from the incoming request's cookies.
 *
 * Never throws: any failure (no DB configured, DB unreachable, no session,
 * malformed data, etc.) resolves to `null` so public pages keep rendering
 * correctly in DB-less environments (e.g. the hermetic Vitest suite, or a
 * misconfigured deploy).
 */
export async function getSession(): Promise<AppSession | null> {
  try {
    const requestHeaders = await headers();
    const result = await getAuth().api.getSession({ headers: requestHeaders });

    if (!result || !result.user || !result.session) {
      return null;
    }

    const rawUser = result.user as Record<string, unknown>;
    const rawSession = result.session as Record<string, unknown>;

    const id = typeof rawUser.id === "string" ? rawUser.id : null;
    const email = typeof rawUser.email === "string" ? rawUser.email : null;
    const sessionId = typeof rawSession.id === "string" ? rawSession.id : null;
    const expiresAtRaw = rawSession.expiresAt;
    const expiresAt =
      expiresAtRaw instanceof Date
        ? expiresAtRaw
        : typeof expiresAtRaw === "string"
          ? new Date(expiresAtRaw)
          : null;

    if (!id || !email || !sessionId || !expiresAt) {
      return null;
    }

    const user: SessionUser = {
      id,
      email,
      name: typeof rawUser.name === "string" ? rawUser.name : "",
      role: coerceRole(rawUser.role),
      emailVerified: Boolean(rawUser.emailVerified),
      image: typeof rawUser.image === "string" ? rawUser.image : null,
    };

    return {
      user,
      session: { id: sessionId, expiresAt },
    };
  } catch {
    return null;
  }
}

/**
 * Requires an authenticated session. Redirects to
 * `/login?next=<encoded nextPath>` when there is none.
 */
export async function requireSession(nextPath: string): Promise<AppSession> {
  const session = await getSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}

/**
 * Requires an authenticated session with an exact role match. On mismatch,
 * calls `notFound()` (not a 403) so the existence of the page is not
 * leaked to unauthorized users.
 */
export async function requireRole(role: Role, nextPath: string): Promise<AppSession> {
  const session = await requireSession(nextPath);
  if (session.user.role !== role) {
    notFound();
  }
  return session;
}
