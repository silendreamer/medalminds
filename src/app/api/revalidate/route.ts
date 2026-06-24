import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Lets the admin content scripts invalidate cached reads after a --write run,
// e.g. POST /api/revalidate?secret=...&tag=content:science-bowl
// Tags follow `contentTag(slug)` in src/lib/data.ts, plus "content:all".
export async function POST(request: Request) {
  const url = new URL(request.url);
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || url.searchParams.get("secret") !== expected) {
    return NextResponse.json({ error: "Invalid or missing secret." }, { status: 401 });
  }

  const tag = url.searchParams.get("tag") ?? "content:all";
  // Next 16 requires a cache-life profile; `{ expire: 0 }` purges immediately.
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: true, tag });
}
