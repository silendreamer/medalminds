import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

import type { Auth } from "@/lib/auth";

// baseURL is intentionally omitted: better-auth's client defaults to
// same-origin requests, which is correct for this app (the client and the
// `/api/auth/[...all]` route handler are always served from the same host).
//
// `inferAdditionalFields<Auth>()` gives `authClient.useSession()` (and the
// other session-returning calls) a typed `role` field on `user`, matching
// the `additionalFields.role` declared in `src/lib/auth.ts`, without
// pulling any server-only code (Prisma, DB env access) into the client
// bundle — only the `Auth` *type* is imported here, which TypeScript
// erases at build time.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<Auth>()],
});
