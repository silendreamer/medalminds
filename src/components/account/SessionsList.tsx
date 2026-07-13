"use client";

import { useEffect, useState } from "react";

import { authClient } from "@/lib/authClient";

type SessionRow = {
  id: string;
  token: string;
  createdAt: Date;
  userAgent?: string | null;
};

function summarizeUserAgent(userAgent?: string | null): string {
  if (!userAgent) {
    return "Unknown device";
  }

  const browser = /Edg\//.test(userAgent)
    ? "Edge"
    : /Chrome\//.test(userAgent)
      ? "Chrome"
      : /Firefox\//.test(userAgent)
        ? "Firefox"
        : /Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)
          ? "Safari"
          : "Browser";

  const os = /Windows/.test(userAgent)
    ? "Windows"
    : /Mac OS X/.test(userAgent)
      ? "macOS"
      : /Android/.test(userAgent)
        ? "Android"
        : /iPhone|iPad/.test(userAgent)
          ? "iOS"
          : /Linux/.test(userAgent)
            ? "Linux"
            : "";

  return os ? `${browser} on ${os}` : browser;
}

function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function SessionsList() {
  const { data: currentSession } = authClient.useSession();
  const [sessions, setSessions] = useState<SessionRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revokingToken, setRevokingToken] = useState<string | null>(null);

  async function loadSessions() {
    setError(null);
    const { data, error: listError } = await authClient.listSessions();
    if (listError) {
      setError(listError.message ?? "Could not load your sessions.");
      return;
    }
    setSessions(
      (data ?? []).map((row) => ({
        id: row.id,
        token: row.token,
        createdAt: new Date(row.createdAt),
        userAgent: row.userAgent,
      }))
    );
  }

  useEffect(() => {
    void loadSessions();
  }, []);

  async function handleRevoke(token: string) {
    setError(null);
    setRevokingToken(token);
    try {
      const { error: revokeError } = await authClient.revokeSession({ token });
      if (revokeError) {
        setError(revokeError.message ?? "Could not revoke that session.");
        return;
      }
      await loadSessions();
    } finally {
      setRevokingToken(null);
    }
  }

  if (sessions === null) {
    return <p style={{ color: "#666666", fontSize: 14 }}>Loading sessions…</p>;
  }

  return (
    <div>
      {error ? <div className="account-message account-message-error">{error}</div> : null}

      {sessions.length === 0 ? (
        <p style={{ color: "#666666", fontSize: 14 }}>No active sessions found.</p>
      ) : (
        sessions.map((row) => {
          const isCurrent = currentSession?.session?.token === row.token;
          return (
            <div className="account-session-row" key={row.id}>
              <div className="account-session-meta">
                <span className="account-session-ua">
                  {summarizeUserAgent(row.userAgent)}
                  {isCurrent ? (
                    <span className="account-session-current-badge">Current</span>
                  ) : null}
                </span>
                <span className="account-session-date">
                  Signed in {formatDate(row.createdAt)}
                </span>
              </div>
              {!isCurrent ? (
                <button
                  type="button"
                  className="account-button account-button-secondary"
                  onClick={() => handleRevoke(row.token)}
                  disabled={revokingToken === row.token}
                >
                  {revokingToken === row.token ? "Revoking…" : "Revoke"}
                </button>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
}
