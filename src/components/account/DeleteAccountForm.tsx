"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/authClient";

const CONFIRM_WORD = "DELETE";

export function DeleteAccountForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = password.length > 0 && confirmText === CONFIRM_WORD && !pending;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!canSubmit) {
      return;
    }

    setPending(true);
    try {
      const { error: deleteError } = await authClient.deleteUser({ password });
      if (deleteError) {
        setError(deleteError.message ?? "Incorrect password. Please try again.");
        return;
      }
      router.push("/");
    } catch {
      setError("Could not delete your account. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="account-danger-zone">
      <h2>Danger zone</h2>
      <p>
        Deleting your account is permanent. All of your sessions and account data will be
        removed and cannot be recovered.
      </p>

      <form onSubmit={handleSubmit}>
        {error ? <div className="account-message account-message-error">{error}</div> : null}

        <div className="account-field">
          <label htmlFor="delete-password">Current password</label>
          <input
            id="delete-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={pending}
          />
        </div>

        <div className="account-field">
          <label htmlFor="delete-confirm">
            Type <strong>{CONFIRM_WORD}</strong> to confirm
          </label>
          <input
            id="delete-confirm"
            name="confirm"
            type="text"
            autoComplete="off"
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value)}
            disabled={pending}
          />
        </div>

        <button
          type="submit"
          className="account-button account-button-danger"
          disabled={!canSubmit}
        >
          {pending ? "Deleting…" : "Delete my account"}
        </button>
      </form>
    </div>
  );
}
