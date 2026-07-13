import Link from "next/link";

import { requireSession } from "@/lib/session";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession("/account");

  return (
    <div
      className="account-shell"
      style={{ display: "flex", gap: 24, alignItems: "flex-start" }}
    >
      <aside style={{ flexShrink: 0 }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Link href="/account">Profile</Link>
          <Link href="/account/settings">Settings</Link>
          <Link href="/account/security">Security</Link>
        </nav>
      </aside>
      <section className="account-content" style={{ flex: 1, minWidth: 0 }}>
        {children}
      </section>
    </div>
  );
}
