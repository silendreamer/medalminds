"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/authClient";

export function SettingsForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const trimmed = name.trim();
    if (!trimmed) {
      setError("Name cannot be empty.");
      return;
    }

    setPending(true);
    try {
      const { error: updateError } = await authClient.updateUser({ name: trimmed });
      if (updateError) {
        setError(updateError.message ?? "Could not update your name. Please try again.");
        return;
      }
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Could not update your name. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <div className="account-message account-message-error">{error}</div> : null}
      {success ? (
        <div className="account-message account-message-success">Your name has been updated.</div>
      ) : null}

      <div className="account-field">
        <label htmlFor="settings-name">Name</label>
        <input
          id="settings-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={pending}
        />
      </div>

      <button type="submit" className="account-button" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
