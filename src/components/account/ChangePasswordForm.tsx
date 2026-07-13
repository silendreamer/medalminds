"use client";

import { useState } from "react";

import { authClient } from "@/lib/authClient";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword.length < 10) {
      setError("New password must be at least 10 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setPending(true);
    try {
      const { error: changeError } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (changeError) {
        setError(changeError.message ?? "Current password is incorrect.");
        return;
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Could not change your password. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <div className="account-message account-message-error">{error}</div> : null}
      {success ? (
        <div className="account-message account-message-success">
          Your password has been changed. Other devices have been signed out.
        </div>
      ) : null}

      <div className="account-field">
        <label htmlFor="current-password">Current password</label>
        <input
          id="current-password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          disabled={pending}
        />
      </div>

      <div className="account-field">
        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          disabled={pending}
        />
      </div>

      <div className="account-field">
        <label htmlFor="confirm-password">Confirm new password</label>
        <input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          disabled={pending}
        />
      </div>

      <button type="submit" className="account-button" disabled={pending}>
        {pending ? "Changing…" : "Change password"}
      </button>
    </form>
  );
}
