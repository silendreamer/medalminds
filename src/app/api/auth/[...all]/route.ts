import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "@/lib/auth";

// `getAuth()` must be called lazily, inside each exported handler — never at
// module top level. `getAuth()` -> `getPrisma()` throws when no DB URL is
// configured (see src/lib/db.ts), and this module must remain importable
// (e.g. by the Next.js build / route manifest) in DB-less environments such
// as the hermetic Vitest suite. Only *invoking* the route requires a DB.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { GET: handler } = toNextJsHandler(getAuth());
  return handler(request);
}

export async function POST(request: Request) {
  const { POST: handler } = toNextJsHandler(getAuth());
  return handler(request);
}
