import type { Metadata } from "next";

import { requireSession } from "@/lib/session";
import { SettingsForm } from "@/components/account/SettingsForm";
import { DeleteAccountForm } from "@/components/account/DeleteAccountForm";

import "../account-page.css";

export const metadata: Metadata = {
  title: "Settings · MedalMinds",
  robots: { index: false, follow: false },
};

export default async function AccountSettingsPage() {
  const session = await requireSession("/account/settings");

  return (
    <>
      <div className="account-card">
        <h2>Edit name</h2>
        <p className="account-card-subtitle">
          This is the name shown across MedalMinds.
        </p>
        <SettingsForm initialName={session.user.name} />
      </div>

      <DeleteAccountForm />
    </>
  );
}
