import { beforeEach, describe, expect, it, vi } from "vitest";

// --- Mocks -----------------------------------------------------------------
//
// These three modules are the entire surface `src/lib/session.ts` touches.
// Mocking them means this suite never imports `@/lib/auth`'s real
// `betterAuth()` instance (which would need a DB) and never runs inside a
// real Next.js request (where `redirect`/`notFound` throw special internal
// values understood by the framework). We substitute our own throwables so
// we can assert on exactly what was requested.

class RedirectSentinel extends Error {
  readonly url: string;
  constructor(url: string) {
    super(`REDIRECT:${url}`);
    this.url = url;
  }
}

class NotFoundSentinel extends Error {
  constructor() {
    super("NOT_FOUND");
  }
}

const redirectMock = vi.fn((url: string) => {
  throw new RedirectSentinel(url);
});
const notFoundMock = vi.fn(() => {
  throw new NotFoundSentinel();
});

vi.mock("next/navigation", () => ({
  redirect: (url: string) => redirectMock(url),
  notFound: () => notFoundMock(),
}));

const headersMock = vi.fn(async () => new Headers());
vi.mock("next/headers", () => ({
  headers: () => headersMock(),
}));

const getSessionApiMock = vi.fn();
const getAuthMock = vi.fn(() => ({
  api: { getSession: getSessionApiMock },
}));
vi.mock("@/lib/auth", () => ({
  getAuth: () => getAuthMock(),
}));

// Import after the mocks are registered so `session.ts` picks them up.
const { getSession, requireSession, requireRole } = await import("./session");

beforeEach(() => {
  redirectMock.mockClear();
  notFoundMock.mockClear();
  headersMock.mockClear();
  getSessionApiMock.mockReset();
  getAuthMock.mockClear();
});

describe("getSession", () => {
  it("returns null when getAuth().api.getSession throws (DB-less / DB error)", async () => {
    getSessionApiMock.mockRejectedValueOnce(new Error("no database configured"));
    await expect(getSession()).resolves.toBeNull();
  });

  it("returns null when getAuth() itself throws synchronously", async () => {
    getAuthMock.mockImplementationOnce(() => {
      throw new Error("db.ts: DATABASE_URL not set");
    });
    await expect(getSession()).resolves.toBeNull();
  });

  it("returns null when the API resolves null", async () => {
    getSessionApiMock.mockResolvedValueOnce(null);
    await expect(getSession()).resolves.toBeNull();
  });

  it("returns null when the API resolves a result missing user/session", async () => {
    getSessionApiMock.mockResolvedValueOnce({ user: null, session: null });
    await expect(getSession()).resolves.toBeNull();
  });

  it("maps a populated response into AppSession", async () => {
    const expiresAt = new Date("2026-08-01T00:00:00.000Z");
    getSessionApiMock.mockResolvedValueOnce({
      user: {
        id: "user-1",
        email: "student@example.com",
        name: "Ada Lovelace",
        role: "PARENT",
        emailVerified: true,
        image: "https://example.com/a.png",
      },
      session: { id: "sess-1", expiresAt },
    });

    await expect(getSession()).resolves.toEqual({
      user: {
        id: "user-1",
        email: "student@example.com",
        name: "Ada Lovelace",
        role: "PARENT",
        emailVerified: true,
        image: "https://example.com/a.png",
      },
      session: { id: "sess-1", expiresAt },
    });
  });

  it("coerces an unexpected/garbage role value to STUDENT", async () => {
    getSessionApiMock.mockResolvedValueOnce({
      user: {
        id: "user-2",
        email: "weird@example.com",
        name: "Weird Role",
        role: "SUPERADMIN",
        emailVerified: false,
        image: null,
      },
      session: { id: "sess-2", expiresAt: new Date("2026-08-01T00:00:00.000Z") },
    });

    const session = await getSession();
    expect(session?.user.role).toBe("STUDENT");
  });

  it("coerces a missing/non-string role value to STUDENT", async () => {
    getSessionApiMock.mockResolvedValueOnce({
      user: {
        id: "user-3",
        email: "norole@example.com",
        name: "No Role",
        role: undefined,
        emailVerified: false,
        image: null,
      },
      session: { id: "sess-3", expiresAt: new Date("2026-08-01T00:00:00.000Z") },
    });

    const session = await getSession();
    expect(session?.user.role).toBe("STUDENT");
  });

  it("parses a string expiresAt into a Date", async () => {
    getSessionApiMock.mockResolvedValueOnce({
      user: {
        id: "user-4",
        email: "dates@example.com",
        name: "Date Fields",
        role: "STUDENT",
        emailVerified: true,
        image: null,
      },
      session: { id: "sess-4", expiresAt: "2026-09-01T00:00:00.000Z" },
    });

    const session = await getSession();
    expect(session?.session.expiresAt).toBeInstanceOf(Date);
    expect(session?.session.expiresAt.toISOString()).toBe("2026-09-01T00:00:00.000Z");
  });

  it("returns null when required fields (id/email/session id) are missing", async () => {
    getSessionApiMock.mockResolvedValueOnce({
      user: { email: "missing-id@example.com", name: "No Id" },
      session: { id: "sess-5", expiresAt: new Date() },
    });

    await expect(getSession()).resolves.toBeNull();
  });
});

describe("requireSession", () => {
  it("redirects to /login?next=<encoded path> when there is no session", async () => {
    getSessionApiMock.mockResolvedValueOnce(null);

    await expect(requireSession("/account")).rejects.toThrow(RedirectSentinel);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith("/login?next=%2Faccount");
  });

  it("URL-encodes special characters in nextPath", async () => {
    getSessionApiMock.mockResolvedValueOnce(null);

    await expect(requireSession("/account/security?x=1")).rejects.toThrow(RedirectSentinel);
    expect(redirectMock).toHaveBeenCalledWith(
      `/login?next=${encodeURIComponent("/account/security?x=1")}`
    );
    // Pin the exact literal too, so a change in encodeURIComponent semantics
    // (or a future switch to a different encoder) is caught explicitly.
    expect(redirectMock).toHaveBeenCalledWith("/login?next=%2Faccount%2Fsecurity%3Fx%3D1");
  });

  it("returns the session (does not redirect) when one exists", async () => {
    getSessionApiMock.mockResolvedValueOnce({
      user: {
        id: "user-1",
        email: "student@example.com",
        name: "Ada Lovelace",
        role: "STUDENT",
        emailVerified: true,
        image: null,
      },
      session: { id: "sess-1", expiresAt: new Date("2026-08-01T00:00:00.000Z") },
    });

    const session = await requireSession("/account");
    expect(redirectMock).not.toHaveBeenCalled();
    expect(session.user.id).toBe("user-1");
  });
});

describe("requireRole", () => {
  it("calls notFound() when the role does not match", async () => {
    getSessionApiMock.mockResolvedValueOnce({
      user: {
        id: "user-1",
        email: "student@example.com",
        name: "Ada Lovelace",
        role: "STUDENT",
        emailVerified: true,
        image: null,
      },
      session: { id: "sess-1", expiresAt: new Date("2026-08-01T00:00:00.000Z") },
    });

    await expect(requireRole("ADMIN", "/account")).rejects.toThrow(NotFoundSentinel);
    expect(notFoundMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("redirects (does not call notFound) when there is no session at all", async () => {
    getSessionApiMock.mockResolvedValueOnce(null);

    await expect(requireRole("ADMIN", "/account")).rejects.toThrow(RedirectSentinel);
    expect(redirectMock).toHaveBeenCalledWith("/login?next=%2Faccount");
    expect(notFoundMock).not.toHaveBeenCalled();
  });

  it("returns the session when the role matches", async () => {
    getSessionApiMock.mockResolvedValueOnce({
      user: {
        id: "user-9",
        email: "admin@example.com",
        name: "Admin User",
        role: "ADMIN",
        emailVerified: true,
        image: null,
      },
      session: { id: "sess-9", expiresAt: new Date("2026-08-01T00:00:00.000Z") },
    });

    const session = await requireRole("ADMIN", "/account");
    expect(notFoundMock).not.toHaveBeenCalled();
    expect(session.user.role).toBe("ADMIN");
  });
});
