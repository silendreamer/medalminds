import type { AppSession, Role } from "@/lib/session";

const ROLE_LABELS: Record<Role, string> = {
  STUDENT: "Student",
  PARENT: "Parent",
  ADMIN: "Admin",
};

function formatMemberSince(createdAt: Date): string {
  return createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ProfileSummary({
  session,
  memberSince,
}: {
  session: AppSession;
  memberSince: Date | null;
}) {
  const { user } = session;

  return (
    <div className="account-card">
      <h2>Profile</h2>
      <p className="account-card-subtitle">Your account details.</p>

      <div className="account-profile-row">
        <span className="account-profile-label">Name</span>
        <span className="account-profile-value">{user.name || "—"}</span>
      </div>

      <div className="account-profile-row">
        <span className="account-profile-label">Email</span>
        <span className="account-profile-value">{user.email}</span>
      </div>

      <div className="account-profile-row">
        <span className="account-profile-label">Role</span>
        <span className="account-badge">{ROLE_LABELS[user.role]}</span>
      </div>

      <div className="account-profile-row">
        <span className="account-profile-label">Email verified</span>
        <span
          className={`account-badge ${
            user.emailVerified ? "account-badge-verified" : "account-badge-unverified"
          }`}
        >
          {user.emailVerified ? "Verified" : "Not verified"}
        </span>
      </div>

      <div className="account-profile-row">
        <span className="account-profile-label">Member since</span>
        <span className="account-profile-value">
          {memberSince ? formatMemberSince(memberSince) : "—"}
        </span>
      </div>
    </div>
  );
}
