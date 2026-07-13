import type { Metadata } from "next";

import { getPrisma } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { ProfileSummary } from "@/components/account/ProfileSummary";

import "./account-page.css";

export const metadata: Metadata = {
  title: "Your profile · MedalMinds",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  // The layout already calls requireSession("/account") before this page
  // renders, so a session is guaranteed here. Calling it again is cheap
  // (5-minute cookie cache) and keeps this page defensively correct if it
  // is ever rendered outside the layout.
  const session = await requireSession("/account");

  let memberSince: Date | null = null;
  try {
    const user = await getPrisma().user.findUnique({
      where: { id: session.user.id },
      select: { createdAt: true },
    });
    memberSince = user?.createdAt ?? null;
  } catch {
    memberSince = null;
  }

  return <ProfileSummary session={session} memberSince={memberSince} />;
}
