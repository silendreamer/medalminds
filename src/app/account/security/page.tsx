import type { Metadata } from "next";

import { requireSession } from "@/lib/session";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";
import { SessionsList } from "@/components/account/SessionsList";

import "../account-page.css";

export const metadata: Metadata = {
  title: "Security · MedalMinds",
  robots: { index: false, follow: false },
};

export default async function AccountSecurityPage() {
  await requireSession("/account/security");

  return (
    <>
      <div className="account-card">
        <h2>Change password</h2>
        <p className="account-card-subtitle">
          Changing your password signs you out of all other devices.
        </p>
        <ChangePasswordForm />
      </div>

      <div className="account-card">
        <h2>Active sessions</h2>
        <p className="account-card-subtitle">
          Devices currently signed in to your account.
        </p>
        <SessionsList />
      </div>
    </>
  );
}
